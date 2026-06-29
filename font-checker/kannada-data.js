/**
 * Kannada Unicode block definitions and OpenType feature requirements
 * for quality checking of Kannada revival fonts.
 * Unicode block: U+0C80–U+0CFF
 */

const KANNADA_CHARS = [
  // --- Signs / Diacritics ---
  { cp: 0x0C80, char: 'ಀ', name: 'Spacing Candrabindu',       cat: 'sign',      required: false, revival: false },
  { cp: 0x0C81, char: 'ಁ', name: 'Candrabindu',               cat: 'sign',      required: true,  revival: false },
  { cp: 0x0C82, char: 'ಂ', name: 'Anusvara',                  cat: 'sign',      required: true,  revival: false },
  { cp: 0x0C83, char: 'ಃ', name: 'Visarga',                   cat: 'sign',      required: true,  revival: false },

  // --- Independent Vowels ---
  { cp: 0x0C85, char: 'ಅ', name: 'Letter A',                  cat: 'vowel',     required: true,  revival: false },
  { cp: 0x0C86, char: 'ಆ', name: 'Letter AA',                 cat: 'vowel',     required: true,  revival: false },
  { cp: 0x0C87, char: 'ಇ', name: 'Letter I',                  cat: 'vowel',     required: true,  revival: false },
  { cp: 0x0C88, char: 'ಈ', name: 'Letter II',                 cat: 'vowel',     required: true,  revival: false },
  { cp: 0x0C89, char: 'ಉ', name: 'Letter U',                  cat: 'vowel',     required: true,  revival: false },
  { cp: 0x0C8A, char: 'ಊ', name: 'Letter UU',                 cat: 'vowel',     required: true,  revival: false },
  { cp: 0x0C8B, char: 'ಋ', name: 'Letter Vocalic R',          cat: 'vowel',     required: true,  revival: false },
  { cp: 0x0C8C, char: 'ಌ', name: 'Letter Vocalic L',          cat: 'vowel',     required: false, revival: true  },
  { cp: 0x0C8E, char: 'ಎ', name: 'Letter E',                  cat: 'vowel',     required: true,  revival: false },
  { cp: 0x0C8F, char: 'ಏ', name: 'Letter EE',                 cat: 'vowel',     required: true,  revival: false },
  { cp: 0x0C90, char: 'ಐ', name: 'Letter AI',                 cat: 'vowel',     required: true,  revival: false },
  { cp: 0x0C92, char: 'ಒ', name: 'Letter O',                  cat: 'vowel',     required: true,  revival: false },
  { cp: 0x0C93, char: 'ಓ', name: 'Letter OO',                 cat: 'vowel',     required: true,  revival: false },
  { cp: 0x0C94, char: 'ಔ', name: 'Letter AU',                 cat: 'vowel',     required: true,  revival: false },

  // --- Consonants ---
  { cp: 0x0C95, char: 'ಕ', name: 'Letter KA',                 cat: 'consonant', required: true,  revival: false },
  { cp: 0x0C96, char: 'ಖ', name: 'Letter KHA',                cat: 'consonant', required: true,  revival: false },
  { cp: 0x0C97, char: 'ಗ', name: 'Letter GA',                 cat: 'consonant', required: true,  revival: false },
  { cp: 0x0C98, char: 'ಘ', name: 'Letter GHA',                cat: 'consonant', required: true,  revival: false },
  { cp: 0x0C99, char: 'ಙ', name: 'Letter NGA',                cat: 'consonant', required: true,  revival: false },
  { cp: 0x0C9A, char: 'ಚ', name: 'Letter CA',                 cat: 'consonant', required: true,  revival: false },
  { cp: 0x0C9B, char: 'ಛ', name: 'Letter CHA',                cat: 'consonant', required: true,  revival: false },
  { cp: 0x0C9C, char: 'ಜ', name: 'Letter JA',                 cat: 'consonant', required: true,  revival: false },
  { cp: 0x0C9D, char: 'ಝ', name: 'Letter JHA',                cat: 'consonant', required: true,  revival: false },
  { cp: 0x0C9E, char: 'ಞ', name: 'Letter NYA',                cat: 'consonant', required: true,  revival: false },
  { cp: 0x0C9F, char: 'ಟ', name: 'Letter TTA',                cat: 'consonant', required: true,  revival: false },
  { cp: 0x0CA0, char: 'ಠ', name: 'Letter TTHA',               cat: 'consonant', required: true,  revival: false },
  { cp: 0x0CA1, char: 'ಡ', name: 'Letter DDA',                cat: 'consonant', required: true,  revival: false },
  { cp: 0x0CA2, char: 'ಢ', name: 'Letter DDHA',               cat: 'consonant', required: true,  revival: false },
  { cp: 0x0CA3, char: 'ಣ', name: 'Letter NNA',                cat: 'consonant', required: true,  revival: false },
  { cp: 0x0CA4, char: 'ತ', name: 'Letter TA',                 cat: 'consonant', required: true,  revival: false },
  { cp: 0x0CA5, char: 'ಥ', name: 'Letter THA',                cat: 'consonant', required: true,  revival: false },
  { cp: 0x0CA6, char: 'ದ', name: 'Letter DA',                 cat: 'consonant', required: true,  revival: false },
  { cp: 0x0CA7, char: 'ಧ', name: 'Letter DHA',                cat: 'consonant', required: true,  revival: false },
  { cp: 0x0CA8, char: 'ನ', name: 'Letter NA',                 cat: 'consonant', required: true,  revival: false },
  { cp: 0x0CAA, char: 'ಪ', name: 'Letter PA',                 cat: 'consonant', required: true,  revival: false },
  { cp: 0x0CAB, char: 'ಫ', name: 'Letter PHA',                cat: 'consonant', required: true,  revival: false },
  { cp: 0x0CAC, char: 'ಬ', name: 'Letter BA',                 cat: 'consonant', required: true,  revival: false },
  { cp: 0x0CAD, char: 'ಭ', name: 'Letter BHA',                cat: 'consonant', required: true,  revival: false },
  { cp: 0x0CAE, char: 'ಮ', name: 'Letter MA',                 cat: 'consonant', required: true,  revival: false },
  { cp: 0x0CAF, char: 'ಯ', name: 'Letter YA',                 cat: 'consonant', required: true,  revival: false },
  { cp: 0x0CB0, char: 'ರ', name: 'Letter RA',                 cat: 'consonant', required: true,  revival: false },
  { cp: 0x0CB1, char: 'ಱ', name: 'Letter RRA (Archaic)',      cat: 'consonant', required: false, revival: true  },
  { cp: 0x0CB2, char: 'ಲ', name: 'Letter LA',                 cat: 'consonant', required: true,  revival: false },
  { cp: 0x0CB3, char: 'ಳ', name: 'Letter LLA',                cat: 'consonant', required: true,  revival: false },
  { cp: 0x0CB5, char: 'ವ', name: 'Letter VA',                 cat: 'consonant', required: true,  revival: false },
  { cp: 0x0CB6, char: 'ಶ', name: 'Letter SHA',                cat: 'consonant', required: true,  revival: false },
  { cp: 0x0CB7, char: 'ಷ', name: 'Letter SSA',                cat: 'consonant', required: true,  revival: false },
  { cp: 0x0CB8, char: 'ಸ', name: 'Letter SA',                 cat: 'consonant', required: true,  revival: false },
  { cp: 0x0CB9, char: 'ಹ', name: 'Letter HA',                 cat: 'consonant', required: true,  revival: false },

  // --- Nukta & Special ---
  { cp: 0x0CBC, char: '಼', name: 'Sign Nukta',                cat: 'sign',      required: true,  revival: false },
  { cp: 0x0CBD, char: 'ಽ', name: 'Sign Avagraha',             cat: 'sign',      required: false, revival: false },

  // --- Dependent Vowel Signs (Matras) ---
  { cp: 0x0CBE, char: 'ಾ', name: 'Vowel Sign AA',             cat: 'matra',     required: true,  revival: false },
  { cp: 0x0CBF, char: 'ಿ', name: 'Vowel Sign I',              cat: 'matra',     required: true,  revival: false },
  { cp: 0x0CC0, char: 'ೀ', name: 'Vowel Sign II',             cat: 'matra',     required: true,  revival: false },
  { cp: 0x0CC1, char: 'ು', name: 'Vowel Sign U',              cat: 'matra',     required: true,  revival: false },
  { cp: 0x0CC2, char: 'ೂ', name: 'Vowel Sign UU',             cat: 'matra',     required: true,  revival: false },
  { cp: 0x0CC3, char: 'ೃ', name: 'Vowel Sign Vocalic R',      cat: 'matra',     required: true,  revival: false },
  { cp: 0x0CC4, char: 'ೄ', name: 'Vowel Sign Vocalic RR',     cat: 'matra',     required: false, revival: true  },
  { cp: 0x0CC6, char: 'ೆ', name: 'Vowel Sign E',              cat: 'matra',     required: true,  revival: false },
  { cp: 0x0CC7, char: 'ೇ', name: 'Vowel Sign EE',             cat: 'matra',     required: true,  revival: false },
  { cp: 0x0CC8, char: 'ೈ', name: 'Vowel Sign AI',             cat: 'matra',     required: true,  revival: false },
  { cp: 0x0CCA, char: 'ೊ', name: 'Vowel Sign O',              cat: 'matra',     required: true,  revival: false },
  { cp: 0x0CCB, char: 'ೋ', name: 'Vowel Sign OO',             cat: 'matra',     required: true,  revival: false },
  { cp: 0x0CCC, char: 'ೌ', name: 'Vowel Sign AU',             cat: 'matra',     required: true,  revival: false },
  { cp: 0x0CCD, char: '್', name: 'Sign Virama (Halant)',      cat: 'sign',      required: true,  revival: false },

  // --- Length Marks ---
  { cp: 0x0CD5, char: 'ೕ', name: 'Length Mark',               cat: 'sign',      required: false, revival: true  },
  { cp: 0x0CD6, char: 'ೖ', name: 'AI Length Mark',            cat: 'sign',      required: false, revival: true  },

  // --- Archaic ---
  { cp: 0x0CDE, char: 'ೞ', name: 'Letter Obsolete LLA',       cat: 'consonant', required: false, revival: true  },

  // --- Vocalic Letters ---
  { cp: 0x0CE0, char: 'ೠ', name: 'Letter Vocalic RR',         cat: 'vowel',     required: false, revival: true  },
  { cp: 0x0CE1, char: 'ೡ', name: 'Letter Vocalic LL',         cat: 'vowel',     required: false, revival: true  },
  { cp: 0x0CE2, char: 'ೢ', name: 'Vowel Sign Vocalic L',      cat: 'matra',     required: false, revival: true  },
  { cp: 0x0CE3, char: 'ೣ', name: 'Vowel Sign Vocalic LL',     cat: 'matra',     required: false, revival: true  },

  // --- Digits ---
  { cp: 0x0CE6, char: '೦', name: 'Digit Zero',                cat: 'digit',     required: true,  revival: false },
  { cp: 0x0CE7, char: '೧', name: 'Digit One',                 cat: 'digit',     required: true,  revival: false },
  { cp: 0x0CE8, char: '೨', name: 'Digit Two',                 cat: 'digit',     required: true,  revival: false },
  { cp: 0x0CE9, char: '೩', name: 'Digit Three',               cat: 'digit',     required: true,  revival: false },
  { cp: 0x0CEA, char: '೪', name: 'Digit Four',                cat: 'digit',     required: true,  revival: false },
  { cp: 0x0CEB, char: '೫', name: 'Digit Five',                cat: 'digit',     required: true,  revival: false },
  { cp: 0x0CEC, char: '೬', name: 'Digit Six',                 cat: 'digit',     required: true,  revival: false },
  { cp: 0x0CED, char: '೭', name: 'Digit Seven',               cat: 'digit',     required: true,  revival: false },
  { cp: 0x0CEE, char: '೮', name: 'Digit Eight',               cat: 'digit',     required: true,  revival: false },
  { cp: 0x0CEF, char: '೯', name: 'Digit Nine',                cat: 'digit',     required: true,  revival: false },

  // --- Special Signs ---
  { cp: 0x0CF1, char: 'ೱ', name: 'Sign Jihvamuliya',          cat: 'sign',      required: false, revival: true  },
  { cp: 0x0CF2, char: 'ೲ', name: 'Sign Upadhmaniya',          cat: 'sign',      required: false, revival: true  },
];

/** Nukta-extended consonants (consonant + U+0CBC) */
const NUKTA_FORMS = [
  { base: 'ಕ', nukta: 'ಕ಼', name: 'KA + Nukta' },
  { base: 'ಖ', nukta: 'ಖ಼', name: 'KHA + Nukta' },
  { base: 'ಗ', nukta: 'ಗ಼', name: 'GA + Nukta' },
  { base: 'ಜ', nukta: 'ಜ಼', name: 'JA + Nukta' },
  { base: 'ಡ', nukta: 'ಡ಼', name: 'DDA + Nukta' },
  { base: 'ಢ', nukta: 'ಢ಼', name: 'DDHA + Nukta' },
  { base: 'ಫ', nukta: 'ಫ಼', name: 'PHA + Nukta' },
  { base: 'ನ', nukta: 'ನ಼', name: 'NA + Nukta' },
  { base: 'ಯ', nukta: 'ಯ಼', name: 'YA + Nukta' },
];

/** Critical conjuncts that should form via akhn/cjct rules */
const CRITICAL_CONJUNCTS = [
  { seq: 'ಕ್ಷ',  name: 'ksha (ಕ + ್ + ಷ)',   feature: 'akhn' },
  { seq: 'ಜ್ಞ',  name: 'jnya (ಜ + ್ + ಞ)',   feature: 'akhn' },
  { seq: 'ತ್ರ',  name: 'tra  (ತ + ್ + ರ)',   feature: 'cjct' },
  { seq: 'ಪ್ರ',  name: 'pra  (ಪ + ್ + ರ)',   feature: 'cjct' },
  { seq: 'ಕ್ತ',  name: 'kta  (ಕ + ್ + ತ)',   feature: 'cjct' },
  { seq: 'ಶ್ರ',  name: 'shra (ಶ + ್ + ರ)',   feature: 'cjct' },
  { seq: 'ಸ್ತ',  name: 'sta  (ಸ + ್ + ತ)',   feature: 'cjct' },
  { seq: 'ನ್ಯ',  name: 'nya  (ನ + ್ + ಯ)',   feature: 'cjct' },
  { seq: 'ಕ್ರ',  name: 'kra  (ಕ + ್ + ರ)',   feature: 'vatu' },
  { seq: 'ಗ್ರ',  name: 'gra  (ಗ + ್ + ರ)',   feature: 'vatu' },
  { seq: 'ದ್ರ',  name: 'dra  (ದ + ್ + ರ)',   feature: 'vatu' },
];

/**
 * OpenType feature definitions for Kannada shaping.
 * 'required' = must be present for correct Kannada rendering
 * 'stage'    = which shaping stage applies it
 */
const OT_FEATURES = [
  // ── Stage 1: Substitutions applied by the shaping engine ───────────────
  { tag: 'locl', name: 'Localized Forms',       stage: 1, required: false, desc: 'Script/language-specific glyph variants' },
  { tag: 'nukt', name: 'Nukta Forms',           stage: 1, required: true,  desc: 'Nukta + consonant → modified consonant glyph' },
  { tag: 'akhn', name: 'Akhand',                stage: 1, required: true,  desc: 'Mandatory ligatures: ಕ್ಷ (ksha), ಜ್ಞ (jnya)' },
  { tag: 'rphf', name: 'Reph Form',             stage: 1, required: false, desc: 'Ra-above-base (reph) form' },
  { tag: 'blwf', name: 'Below-base Forms',      stage: 1, required: true,  desc: 'Consonants that descend below the baseline' },
  { tag: 'half', name: 'Half Forms',            stage: 1, required: false, desc: 'Half-consonant forms (less common in Kannada)' },
  { tag: 'pstf', name: 'Post-base Forms',       stage: 1, required: false, desc: 'Consonant forms that appear after the base' },
  { tag: 'vatu', name: 'Vattu Variants',        stage: 1, required: true,  desc: 'Below-base Ra (vattu) joining forms' },
  { tag: 'cjct', name: 'Conjunct Forms',        stage: 1, required: true,  desc: 'Full conjunct ligatures (ottakshara)' },
  // ── Stage 2: Positioning & further substitution ─────────────────────────
  { tag: 'pres', name: 'Pre-base Substitutions',  stage: 2, required: true,  desc: 'Matras appearing before base consonant' },
  { tag: 'abvs', name: 'Above-base Substitutions',stage: 2, required: true,  desc: 'Anusvara, chandrabindu above base' },
  { tag: 'blws', name: 'Below-base Substitutions',stage: 2, required: true,  desc: 'U, UU, R matras below consonant' },
  { tag: 'psts', name: 'Post-base Substitutions', stage: 2, required: true,  desc: 'AA and other post-base matras' },
  { tag: 'haln', name: 'Halant Forms',            stage: 2, required: true,  desc: 'Explicit halant display (virama visible)' },
  { tag: 'calt', name: 'Contextual Alternates',   stage: 2, required: false, desc: 'Context-sensitive alternate glyphs' },
  // ── Positioning (GPOS) ──────────────────────────────────────────────────
  { tag: 'dist', name: 'Distances',              stage: 3, required: false, desc: 'Inter-character spacing (preferred over kern for Indic)' },
  { tag: 'kern', name: 'Kerning',                stage: 3, required: false, desc: 'Pair-wise kerning adjustments' },
  { tag: 'mark', name: 'Mark Positioning',       stage: 3, required: true,  desc: 'Diacritic attachment to base glyphs' },
  { tag: 'mkmk', name: 'Mark-to-mark',           stage: 3, required: false, desc: 'Stacking diacritic positioning' },
  // ── Optional / aesthetic ────────────────────────────────────────────────
  { tag: 'liga', name: 'Standard Ligatures',     stage: 2, required: false, desc: 'Optional common ligatures' },
  { tag: 'ss01', name: 'Stylistic Set 01',       stage: 2, required: false, desc: 'First stylistic alternate set' },
  { tag: 'ss02', name: 'Stylistic Set 02',       stage: 2, required: false, desc: 'Second stylistic alternate set' },
  { tag: 'cv01', name: 'Character Variant 01',   stage: 2, required: false, desc: 'Character-level variants' },
  { tag: 'sups', name: 'Superscript',            stage: 2, required: false, desc: 'Superscript numerals' },
];

/** GSUB lookup type names */
const GSUB_LOOKUP_TYPES = {
  1: 'Single (1→1)',
  2: 'Multiple (1→many)',
  3: 'Alternate (1→alternates)',
  4: 'Ligature (many→1)',
  5: 'Context',
  6: 'Chained Context',
  7: 'Extension',
  8: 'Reverse Chain Context',
};

/** GPOS lookup type names */
const GPOS_LOOKUP_TYPES = {
  1: 'Single Adjustment',
  2: 'Pair Adjustment (Kerning)',
  3: 'Cursive Attachment',
  4: 'Mark-to-Base',
  5: 'Mark-to-Ligature',
  6: 'Mark-to-Mark',
  7: 'Context Positioning',
  8: 'Chained Context Positioning',
  9: 'Extension Positioning',
};

/** Metadata fields to check completeness */
const METADATA_FIELDS = [
  { key: 'copyright',       nameId: 0,  label: 'Copyright' },
  { key: 'fontFamily',      nameId: 1,  label: 'Font Family' },
  { key: 'fontSubfamily',   nameId: 2,  label: 'Font Subfamily' },
  { key: 'uniqueID',        nameId: 3,  label: 'Unique Identifier' },
  { key: 'fullName',        nameId: 4,  label: 'Full Name' },
  { key: 'version',         nameId: 5,  label: 'Version' },
  { key: 'postScriptName',  nameId: 6,  label: 'PostScript Name' },
  { key: 'trademark',       nameId: 7,  label: 'Trademark' },
  { key: 'manufacturer',    nameId: 8,  label: 'Manufacturer' },
  { key: 'designer',        nameId: 9,  label: 'Designer' },
  { key: 'description',     nameId: 10, label: 'Description' },
  { key: 'manufacturerURL', nameId: 11, label: 'Manufacturer URL' },
  { key: 'designerURL',     nameId: 12, label: 'Designer URL' },
  { key: 'license',         nameId: 13, label: 'License' },
  { key: 'licenseURL',      nameId: 14, label: 'License URL' },
  { key: 'sampleText',      nameId: 19, label: 'Sample Text' },
];

module.exports = {
  KANNADA_CHARS,
  NUKTA_FORMS,
  CRITICAL_CONJUNCTS,
  OT_FEATURES,
  GSUB_LOOKUP_TYPES,
  GPOS_LOOKUP_TYPES,
  METADATA_FIELDS,
};
