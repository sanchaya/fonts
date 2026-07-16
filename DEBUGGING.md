# Debugging Log — Font Rendering Issues, Root Causes & Fixes

A running log of every notable bug, its root cause, the fix applied, and the
reasoning behind it.  New entries go at the top.

---

## 1. HarfBuzz SIGSEGV — `uharfbuzz` + `freetype-py` memory corruption

**Environment**  Python 3.9.6, Apple Clang 21, macOS (Apple Silicon),
uharfbuzz 0.51.7, freetype-py 2.5.1

**Symptoms**
- The Python render CLI (`render-harfbuzz.py`) crashes with `SIGSEGV`
  (exit code 139) for any font file after an `hb.Blob()` object is created.
- Crashes in `face.load_glyph()` — the FreeType glyph loading call.
- Works fine if `uharfbuzz` is never imported.  Works fine if `freetype-py`
  is never imported.  Crashes whenever both are used in the same process.
- Some fonts (`AkayaKanadaka`, `Helvetica`) appear to work — but that is
  only because their glyph memory layout doesn't trigger the corruption
  immediately.  The underlying memory is still corrupted.

**Root cause**
`uharfbuzz` wraps HarfBuzz's `hb_blob_create()` via ctypes.  Internally it
registers a Python callback to free the data when the blob is destroyed.
On this platform the callback or memory view setup corrupts memory that
`freetype-py` relies on for its glyph slot / face cache.  The corruption
is latent — `freetype.Face()` and `face.set_char_size()` succeed — but
the next `face.load_glyph()` dereferences a corrupted pointer and segfaults.

Reproducer (always crashes):
```python
import uharfbuzz as hb, freetype
face = freetype.Face("/path/to/font.ttf")
face.set_char_size(64 * 64)
blob = hb.Blob(b"\x00" * 100)       # ← corrupts memory
face.load_glyph(0)                    # ← SIGSEGV
```

**Fix**
Isolate HarfBuzz shaping in a subprocess.  `shape_text_subprocess()` in
`render-harfbuzz.py` spawns a separate Python interpreter via
`subprocess.run([sys.executable, '-c', hb_script, ...])` that only imports
`uharfbuzz`.  The main process only imports `freetype` + `Pillow`.  Glyph
layout data is passed back as JSON over stdout.

**Files touched**
`engine-inspector/bin/render-harfbuzz.py` — entirely rewritten the shaping
path; the `shape_text()` function was replaced by `shape_text_subprocess()`.

---

## 2. HarfBuzz glyph-to-pixel conversion — wrong unit factor

**Environment**  uharfbuzz 0.51.7, freetype-py 2.5.1

**Symptoms**
- HarfBuzz-rendered text appears incorrectly sized and positioned.
- The glyph table shows nonsensical `x_advance` / `x_offset` values.

**Root cause**
HarfBuzz returns glyph positions in **font (em) units**, not in FreeType's
26.6 fractional pixel format.  The original code used `font_units / 64`
(FreeType's convention: 1 pixel = 64 fractional units), which is wrong for
HarfBuzz output.  Correct conversion is:

```
pixels = font_units * font_size / upem
```

where `upem` (units-per-em) is typically 1000 or 2048.

**Fix**
Replaced `font_units / 64` with `font_units * font_size / upem` in both
the Python render script (glyph-to-bitmap positioning) and the client-side
glyph table display in `engineInspector.ejs`.

**Files touched**
- `engine-inspector/bin/render-harfbuzz.py` — scaling factor in `render_shaped_png()`
- `views/fontSelectedPage/engineInspector/engineInspector.ejs` — glyph table pixel conversion

---

## 3. Portal nav-pills — CSS selector mismatch (hardcoded colors)

**Environment**  Bootstrap 3, custom style.css

**Symptoms**
- Font detail page tabs (PARAGRAPH, OVERVIEW, SYLLABARY, etc.) don't show
  the portal's primary blue background on the active tab.
- Hover effects on tabs don't work.
- Tab colors look disconnected from the rest of the portal.

**Root cause**
The CSS at `style.css:559` used `.nav.nav-pills.nav-justified.secondary`
but the actual HTML has only `class="nav nav-pills secondary"` (no
`nav-justified`).  None of the active/hover/color rules matched.

Additionally, the hardcoded colors (`#4361ee`, `#4a4a68`) were not using
the portal's CSS custom properties (`--primary-gradient`, `--span-color`,
`--text-color3`, etc.).

**Fix**
1. Changed the selector from `.nav.nav-pills.nav-justified.secondary` to
   `.nav.nav-pills.secondary` — works for both variants.
2. Replaced all hardcoded colors with portal CSS variables:
   - Active tab: `background: var(--primary-gradient); color: var(--text-color2)`
   - Inactive text: `color: var(--span-color)`
   - Hover: `color: var(--text-color3); background-color: var(--hover-color)`
3. Updated `.nav-container .nav-pills` container to use `--card-shadow`,
   `--border-color`, `--third-color`.

**Files touched**
`static/css/style.css` — lines 559-576 (secondary nav-pills), lines 51-76
(nav-container).

---

## 4. RENDERING QA tab — third-party color palette

**Environment**  style.css, engine-inspector

**Symptoms**
- The RENDERING QA tab's font badge is green, loading state uses non-portal
  blue tones, table headers use `#e0e7ff` instead of the portal's light blue.
- The inspection card shadow is hardcoded `rgba(0,0,0,0.06)`.

**Root cause**
The engine inspector CSS was copied from the upstream project with its own
color palette (green badging, Tailwind-style grays, etc.) instead of
integrating with the portal's design tokens.

**Fix**
Replaced all hardcoded colors in the `.engine-inspector-inline` rules with
portal CSS variables:

| Component | Before | After |
|---|---|---|
| Font badge | `#d1fae5` / `#065f46` (green) | `--customizing-icon-background` / `--text-color3` (blue) |
| Primary button | flat blue bg | `--primary-gradient` + `--card-shadow` |
| Card shadow | `0 2px 8px rgba(0,0,0,0.06)` | `--card-shadow` |
| Loading state | `#dbeafe` / `#1e3a8a` | `--customizing-icon-background` / `--text-color3` |
| Table header | `#e0e7ff` | `--customizing-icon-background` |
| Row hover/even | `#f8f9fa` | `--text-background` |
| Spinner border | `#dbeafe` | `--customizing-icon-background` |

**Files touched**
`static/css/style.css` — entire `.engine-inspector-inline *` block
(lines 958-1209).

---

## 5. API protocol — FormData vs JSON + multer

**Symptoms**
- Render API returns "Unexpected end of form" error.
- File upload middleware (`multer`) is unnecessary since the API serves
  fonts from disk by name, not from user upload.

**Root cause**
The original route used `multer` (configured with `inspectorUpload`) and
called `req.body` for text fields, expecting default `urlencoded` /
`json` parsing.  But `multer` overrides the body parser when present,
leaving non-file fields empty.

**Fix**
1. Removed multer entirely from the route handler.
2. Switched client to send `Content-Type: application/json`.
3. The route now only supports the `fontFamily` mode (fonts resolved
   server-side from `static/Fonts/<family>/`).

**Files touched**
- `index.js` — `POST /api/engine-inspector/render` route
- `views/fontSelectedPage/engineInspector/engineInspector.ejs` — fetch body

---

## 6. QA report grade / badge inconsistency

**Environment**  font-checker reporter.js, fontQuality.json

**Symptoms**
- QA report badges (error/warning counts) don't match the Issues list
  in the same report.
- The "grade" shown (A/B/C/D/F) doesn't match the live analyzer's grade.

**Root cause**
The QA report was computing error/warning counts and grade independently
from the live analyzer.  A separate `fontQuality.json` stored pre-computed
stats that diverged from what the analyzer would produce on a fresh run.

**Fix**
1. Regenerated `fontQuality.json` using the live analyzer.
2. Removed the separate error-penalized grading — now uses the analyzer's
   grade directly.
3. Reverted badge computation to use the Issues list as the source of
   truth, matching the report's own content.

**Files touched**
- `fontQuality.json`
- `font-checker/reporter.js` — badge rendering
- `index.js` — QA route data flow

---

## 7. QA report active tab text hidden in light mode

**Symptoms**
- When a QA report sub-tab is active, its text is invisible (white on
  white) in light mode.

**Root cause**
The active tab used `color: var(--third-color)` which resolves to white
(`#ffffff`).  In light mode the tab background is also white, making text
invisible.  This only worked in dark mode where the background is dark.

**Fix**
Changed active tab text color to `var(--primary-color)` (`#4361ee`).

**Files touched**
`static/css/style.css` — QA report tab active state style.

---

## 8. QA report — wrong font glyphs in Unicode Coverage

**Symptoms**
- The Kannada Unicode Coverage chart under QA report renders glyphs in
  the wrong font (typically the system default instead of the font being
  reviewed).

**Root cause**
The glyph rendering code didn't use the specific font file path — it
relied on the CSS `@font-face` name, which may not be loaded when the
report is embedded.

**Fix**
Pass the font file path explicitly to the glyph renderer so it always
uses the reviewed font.

**Files touched**
`index.js` — QA report route passes font path; `font-checker/reporter.js`
reads the path.

---

## 9. Dropdown menu hiding on hover

**Environment**  Bootstrap 3, custom CSS

**Symptoms**
- The filter dropdown menu disappears when the user moves the cursor
  from the toggle button to a menu item.

**Root cause**
A gap between the toggle button and the dropdown menu causes the menu
to close (Bootstrap's `hover` + `focus` triggers fire `blur`/`mouseleave`).

**Fix**
Applied `position: absolute` to the dropdown container and removed the
gap by bridging with negative margin / padding continuity.

**Files touched**
`static/css/style.css`

---

## 10. Category filter checkbox state

**Symptoms**
- Clicking a category filter label doesn't reliably toggle the checkbox.

**Root cause**
The event handler was attached to the label's `click` event, which fires
before the checkbox state updates in some browsers.  The handler read
the stale state.

**Fix**
Changed the event to `change` on the checkbox input directly, which
fires after the state is updated.

**Files touched**
`static/js/home.js`

---

## 11. Category filter crash — array from query-string parser

**Symptoms**
- Page crashes when selecting multiple category filters.
- Error: `categories.includes is not a function`

**Root cause**
The `qs` parser (or Express query parser) returns an array for duplicate
query params (`?category=A&category=B`), but the code expected a string.
Calling `.includes()` on the array was fine, but some operator or
conditional assumed a scalar.

**Fix**
Added normalization: `const cats = Array.isArray(categories) ? categories : [categories]`.

**Files touched**
`Main/fontSelectedPage/fontSelectedPage.js`

---

## 12. Font directory name resolution — hyphen vs underscore

**Environment**  Express, EJS, opentype.js

**Symptoms**
- Font detail page returns 404 for fonts with hyphens in the directory
  name (e.g. `Karnata-Bandipur`).
- Glyph loading also fails for the same fonts.
- Metadata category detection fails for some fonts.

**Root cause**
Three independent instances of the same bug:
1. `views/index.ejs` converted hyphens to underscores in the directory
   path (`Karnata-Bandipur` → `Karnata_Bandipur`), but the actual
   directory on disk uses hyphens.
2. `index.js` `loadFontGlyphs()` had the same conversion logic.
3. `fontSelectedPage.js` `getFontCategory()` used a different key format
   (underscore vs hyphen) for metadata lookup.

**Fix**
Created `getFontDir(family)` in `index.js` that reads `fs.readdirSync()`
and does a case-insensitive match against both hyphen and underscore
variants.  All three call sites now use this function.

**Files touched**
- `index.js` — added `getFontDir()`, fixed `loadFontGlyphs()`
- `views/index.ejs` — removed inline conversion
- `Main/fontSelectedPage/fontSelectedPage.js` — fixed metadata key format

---

## 13. Download links — hardcoded `.ttf` extension

**Symptoms**
- Download button returns 404 for fonts that only have `.otf` files
  (Gajamukha, HindMysuru, Kolar).

**Root cause**
The download button hardcoded `.ttf` as the file extension.  Many fonts
ship only `.otf`.

**Fix**
Added `findDownloadFont()` in `index.js` that scans the font directory
for `.ttf` or `.otf` files and returns the first found.  The template
only renders the download button when `downloadUrl` is non-empty.

**Files touched**
`index.js`, `views/index.ejs`

---

## 14. License detection — missing "ofl" substring

**Symptoms**
- Open-source fonts like Ellara-Kannada (licensed "SIL Open Font License
  1.1") show a "Proprietary" badge.

**Root cause**
The `index.ejs` open-source check used `.includes('ofl')` but the license
string is `"SIL Open Font License 1.1"` which doesn't contain "ofl".

**Fix**
Added `'open font'` to the detection list (substring of "Open Font License").
Also checks for `'ofl'` and `'sil'`.

**Files touched**
`views/index.ejs`

---

## 15. IntersectionObserver crash on missing element

**Symptoms**
- JavaScript error on pages without a `#sticky-toolbar` element:
  `Cannot read properties of null (reading 'classList')`

**Root cause**
`intersectionObserverForSticky()` in `home.js` assumed `#sticky-toolbar`
always exists, but some pages don't have this element.

**Fix**
Added a null guard at the top of the function.  If the element doesn't
exist, return early.

**Files touched**
`static/js/home.js`

---

## 16. Nav pills overflow — clipped on narrow screens

**Symptoms**
- On narrow viewports, some tabs (especially after adding RENDERING QA
  to make 9 tabs) are clipped or cause horizontal scroll.

**Root cause**
The nav pills used `display: flex` without `flex-wrap`, causing items
to overflow the container.

**Fix**
Added `flex-wrap: wrap` and `min-width: 90px` to the pills container,
and removed `nav-justified` which forced equal widths.

**Files touched**
`static/css/style.css` — `.nav-container .nav-pills`

---

## 17. Error resilience — unhandled rejections crash the server

**Symptoms**
- An unhandled Promise rejection or uncaught exception in any route
  causes the Node.js process to exit with an `ERR_UNHANDLED_REJECTION`
  error.

**Root cause**
Express does not automatically catch async errors thrown in route
handlers (pre-Express 5).  Node.js ≥15 exits on unhandled rejections
by default.

**Fix**
1. Added a global Express error handler middleware as the last route.
2. Added `process.on('uncaughtException')` and
   `process.on('unhandledRejection')` handlers that log the error and
   continue (or exit gracefully).

**Files touched**
`index.js` — end of file, after all route definitions.

---

## 18. URLs pointing to wrong domain

**Symptoms**
- Links, README, and config in the cloned `engine-inspector/` directory
  reference `fonts.sanchaya.org` instead of `fonts.sanchaya.net`.

**Fix**
Updated all occurrences across `README.md`, `public/index.html`,
`package.json`, `.env.example`, and `src/app.js`.

**Files touched**
`engine-inspector/README.md`, `engine-inspector/public/index.html`,
`engine-inspector/package.json`, `engine-inspector/.env.example`,
`engine-inspector/src/app.js`
