# Changelog

## [2026-07-16] RENDERING QA tab, HarfBuzz segfault fix, portal theme integration

### Added
- **RENDERING QA tab** on font detail page — inline dual-engine comparison between browser-native and HarfBuzz rendering
- **Engine Inspector integration**: `POST /api/engine-inspector/render`, `GET /api/engine-inspector/test-strings`, `GET /engine-inspector/:family` routes
- **`engine-inspector/`** directory with Python HarfBuzz+FreeType render CLI (`bin/render-harfbuzz.py`) and theme CSS
- `views/engineInspectorStandalone.ejs` standalone page for direct inspector access
- `views/fontSelectedPage/engineInspector/engineInspector.ejs` inline partial

### Fixed
- **HarfBuzz SIGSEGV crash**: `uharfbuzz` 0.51.7 corrupts memory when `hb.Blob()` is created in the same process as `freetype-py`, causing `SIGSEGV` in `face.load_glyph()`. Fixed by isolating HarfBuzz shaping in a subprocess — `shape_text_subprocess()` spawns a separate Python interpreter for HB, keeping FreeType rendering in the main process. All font files now render correctly (previously any glyph load after an `hb.Blob()` call would segfault).
- **HarfBuzz glyph-to-pixel conversion**: Render script was using `font_units / 64` (FreeType 26.6 convention) but HarfBuzz returns positions in em-units. Corrected to `font_units * font_size / upem`. Same fix applied client-side in glyph table display.
- **Portal color scheme integration**: Nav pills now use `--primary-gradient` for active state (instead of flat blue), `--span-color`/`--text-color3`/`--border-color`/`--card-shadow` portal CSS variables throughout. The `secondary` class selector was fixed to match the actual HTML (which lacks `nav-justified`) — active/hover states now apply correctly to all 9 tabs.
- **RENDERING QA theme**: Font badge uses `--customizing-icon-background` (blue portal tone, was green), button uses `--primary-gradient` + `--card-shadow`, loading/table/input styles now reference portal CSS variables instead of hardcoded colors.
- **API protocol**: Switched from FormData to JSON (`Content-Type: application/json`), removed multer middleware.
- **Error resilience**: Added global Express error handler and process-level `uncaughtException`/`unhandledRejection` handlers.
- **Nav pills overflow**: Added `flex-wrap` + `min-width: 90px` so all 9 tabs stay visible without overflow.
- **URL consistency**: Updated `fonts.sanchaya.org` → `fonts.sanchaya.net` across cloned engine-inspector files.

### Changed
- Renamed tab label from "ENGINE INSPECTOR" to "RENDERING QA"
- Tab pill now directly includes inspector partial via `<%- include(...) %>` (no iframe)
- `.nav-container .nav-pills` and `.nav.nav-pills.secondary` now use portal CSS variables for all colors, shadows, and borders

## [2026-05-08] Karnata Bandipur font addition, Nudi reorg, and font rendering fixes

### Added
- **Karnata Bandipur** font family added:
  - TTF, OTF, WOFF2 files and OFL license in `static/Fonts/Karnata-Bandipur/`
  - New entry in `fonts.json` with family "Karnata Bandipur"
  - Metadata in `fontMetadata.json`
  - Card in Sanchaya Font Projects section on homepage
  - `@font-face` declaration in `fonts.css`

### Fixed
- **Font rendering**: Aligned `font-family` names between `@font-face` declarations and card previews in `home-api.js` and `fontShowPage.js`

### Changed
- **Nudi-Akshara-03**: Moved from top-level entry to sub-entry under `Nudi-Fonts` in `fonts.json`
- **fontAdded.js regeneration**: Script regenerates `fonts.json` and `fonts.css` from disk files; curated family names are manually restored after regeneration
- Removed dedicated `/Fonts` Express route (reverted to single `express.static` for `static/`)
- Reverted `recursive` → `serif` CSS fallback change

### Infrastructure
- `fontAdded.js` used to sync `fonts.json` and `fonts.css` with files on disk
- Merge strategy: preserve curated entries for existing fonts, auto-add newly discovered fonts
- Python verification script ensures all `fonts.json` first-font names have matching `@font-face` declarations

## [2026-05-08] Directory name resolution fixes and production 404 investigation

### Fixed
- **Font detail page 404s**: `index.ejs` was converting hyphens to underscores in directory paths (`Karnata-Bandipur` → `Karnata_Bandipur`), breaking font loading for hyphen-named directories. Now uses a disk-aware lookup via `getFontDir()` that checks both underscore and hyphen variants.
- **Glyph loading failure**: `loadFontGlyphs()` in `index.js` had the same hyphen-to-underscore conversion bug. Fixed by using `getFontDir()`.
- **IntersectionObserver crash**: `home.js` `intersectionObserverForSticky()` crashed when `#sticky-toolbar` element didn't exist. Added null guard.
- **Metadata key lookup**: `getFontCategory()` in `fontSelectedPage.js` used wrong metadata key format (underscore vs hyphen), preventing category detection for some fonts.

### Changed
- Server route `/font/:family/:font` now computes `fontDirectory` via `getFontDir()` and passes it to the template instead of relying on template-side conversion.

## [2026-05-08] Download link fixes and metadata updates

### Fixed
- **Download links for open source fonts**: Download button hardcoded `.ttf` extension, causing 404 for fonts with only `.otf` (Gajamukha, HindMysuru, Kolar). Added `findDownloadFont()` server-side function that detects actual font file (TTF or OTF) on disk.
- **License detection**: `index.ejs` open source check didn't match `"SIL Open Font License 1.1"` (missing "ofl" substring). Added `'open font'` to the detection list.
- **Download button condition**: Added `downloadUrl` guard so button only shows when a downloadable file exists.

### Added
- **Ellara-Kannada metadata**: Added author (Pisumathu), source, and description to `fontMetadata.json`.
