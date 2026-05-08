# Changelog

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
