#!/usr/bin/env python3
"""
render-harfbuzz.py — CLI for HarfBuzz+FreeType rendering.

Workaround: HarfBuzz shaping runs in a subprocess to avoid a memory corruption
bug when uharfbuzz and freetype-py coexist in the same process on certain
platforms (SIGSEGV in face.load_glyph after any hb.Blob() creation).

Usage:
  python3 render-harfbuzz.py <font_path> <text> <out_png> [font_size] [script] [language] [features_json]

Example:
  python3 render-harfbuzz.py /path/to/font.ttf "ಕನ್ನಡ" /tmp/out.png 64 "Knda" "kan" '{"kern": 1}'

Output:
  Writes PNG to <out_png> and prints JSON to stdout with glyph data + image dimensions.
"""

import subprocess
import sys
import json
import os
import freetype
from PIL import Image


def shape_text_subprocess(font_path, text, font_size=64, script=None, language=None, features=None):
    """Run HarfBuzz shaping in a subprocess to avoid memory corruption."""
    FEATURES_PLACEHOLDER = "__FEATURES__"
    hb_script = (
        'import json, sys, os\n'
        'os.environ["PYTHONPATH"] = ""\n'
        'import uharfbuzz as hb\n\n'
        'font_path = sys.argv[1]\n'
        'text = sys.argv[2]\n'
        'script_arg = sys.argv[3] or None\n'
        'language_arg = sys.argv[4] or None\n'
        f'features_arg = {json.dumps(features or {})}\n\n'
        'with open(font_path, "rb") as f:\n'
        '    font_data = f.read()\n\n'
        'hb_blob = hb.Blob(font_data)\n'
        'hb_face = hb.Face(hb_blob)\n'
        'hb_font = hb.Font(hb_face)\n'
        'upem = hb_face.upem\n'
        'hb_font.scale = (upem, upem)\n\n'
        'buf = hb.Buffer()\n'
        'buf.add_str(text)\n'
        'buf.guess_segment_properties()\n'
        'if script_arg:\n'
        '    buf.script = script_arg\n'
        'if language_arg:\n'
        '    buf.language = language_arg\n\n'
        'hb.shape(hb_font, buf, features_arg)\n\n'
        'glyphs = []\n'
        'for info, pos in zip(buf.glyph_infos, buf.glyph_positions):\n'
        '    glyphs.append({\n'
        '        "glyph_id": info.codepoint,\n'
        '        "cluster": info.cluster,\n'
        '        "x_advance": pos.x_advance,\n'
        '        "y_advance": pos.y_advance,\n'
        '        "x_offset": pos.x_offset,\n'
        '        "y_offset": pos.y_offset,\n'
        '    })\n\n'
        'print(json.dumps({"glyphs": glyphs, "upem": upem}))\n'
    )
    features_json = json.dumps(features or {})
    args = [
        sys.executable, '-c', hb_script,
        font_path, text, script or '', language or '', features_json
    ]
    result = subprocess.run(
        args,
        capture_output=True, text=True, timeout=30,
        env={**os.environ, 'PYTHONPATH': ''}
    )
    if result.returncode != 0:
        raise RuntimeError(f"HarfBuzz subprocess failed: {result.stderr}")
    return json.loads(result.stdout)


def render_shaped_png(font_path, text, out_path, font_size=64, padding=20,
                      features=None, script=None, language=None,
                      bg=(255, 255, 255, 255), fg=(20, 20, 20, 255)):
    """Shape with HarfBuzz (subprocess), rasterize with FreeType."""
    shaped = shape_text_subprocess(font_path, text, font_size, script, language, features)

    face = freetype.Face(font_path)
    face.set_char_size(font_size * 64)

    upem = shaped["upem"]
    scale = font_size / upem

    max_ascent = int(face.size.ascender / 64) if face.size.ascender else font_size
    max_descent = int(abs(face.size.descender) / 64) if face.size.descender else int(font_size * 0.25)

    total_advance = sum(g["x_advance"] for g in shaped["glyphs"]) * scale
    width = max(int(total_advance) + padding * 2, 10)
    height = max_ascent + max_descent + padding * 2

    img = Image.new("RGBA", (width, height), bg)
    baseline_y = padding + max_ascent

    pen_x_px = 0.0
    for g in shaped["glyphs"]:
        face.load_glyph(g["glyph_id"], freetype.FT_LOAD_RENDER | freetype.FT_LOAD_DEFAULT)
        bitmap = face.glyph.bitmap
        left = face.glyph.bitmap_left
        top = face.glyph.bitmap_top

        gx = int(pen_x_px) + int(g["x_offset"] * scale) + left + padding
        gy = baseline_y - top - int(g["y_offset"] * scale)

        if bitmap.width > 0 and bitmap.rows > 0:
            glyph_img = Image.frombytes("L", (bitmap.width, bitmap.rows), bytes(bitmap.buffer))
            glyph_rgba = Image.new("RGBA", glyph_img.size, fg)
            glyph_rgba.putalpha(glyph_img)
            img.alpha_composite(glyph_rgba, (gx, gy))

        pen_x_px += g["x_advance"] * scale

    img.save(out_path)
    shaped["image_width"] = width
    shaped["image_height"] = height
    shaped["padding"] = padding
    shaped["font_size"] = font_size
    return shaped


def main():
    if len(sys.argv) < 4:
        print("Usage: render-harfbuzz.py <font_path> <text> <out_png> [font_size] [script] [language] [features_json]", file=sys.stderr)
        sys.exit(1)

    font_path = sys.argv[1]
    text = sys.argv[2]
    out_png = sys.argv[3]
    font_size = int(sys.argv[4]) if len(sys.argv) > 4 and sys.argv[4] else 64
    script = sys.argv[5] if len(sys.argv) > 5 and sys.argv[5] else None
    language = sys.argv[6] if len(sys.argv) > 6 and sys.argv[6] else None
    features_str = sys.argv[7] if len(sys.argv) > 7 and sys.argv[7] else "{}"

    try:
        features = json.loads(features_str) if features_str else {}
    except:
        features = {}

    result = render_shaped_png(font_path, text, out_png, font_size, features=features, script=script, language=language)
    print(json.dumps(result, ensure_ascii=False))


if __name__ == "__main__":
    main()
