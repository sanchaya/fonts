'use strict';

/**
 * Core font analysis engine for Kannada revival font quality checking.
 * Uses opentype.js to inspect font internals.
 */

const opentype = require('opentype.js');
const {
  KANNADA_CHARS,
  NUKTA_FORMS,
  CRITICAL_CONJUNCTS,
  OT_FEATURES,
  GSUB_LOOKUP_TYPES,
  GPOS_LOOKUP_TYPES,
  METADATA_FIELDS,
} = require('./kannada-data');

/**
 * Load a font from a file path.
 * @param {string} filePath
 * @returns {opentype.Font}
 */
function loadFont(filePath) {
  return opentype.loadSync(filePath);
}

// ─── Metadata ───────────────────────────────────────────────────────────────

function analyzeMetadata(font) {
  const names = font.names;
  const fields = {};
  const missing = [];

  for (const f of METADATA_FIELDS) {
    const val = names[f.key];
    const text = val
      ? (val.en || val['en-US'] || Object.values(val)[0] || null)
      : null;
    fields[f.key] = { label: f.label, value: text, present: !!text };
    if (!text) missing.push(f.label);
  }

  // OS/2 table info
  const os2 = font.tables.os2;
  const head = font.tables.head;
  const post = font.tables.post;

  return {
    fields,
    missing,
    os2: os2 ? {
      version:       os2.version,
      weightClass:   os2.usWeightClass,
      widthClass:    os2.usWidthClass,
      fsType:        os2.fsType,
      panose:        os2.panose ? Array.from(os2.panose) : null,
      unicodeRanges: getUnicodeRanges(os2),
      codePageRanges: os2.ulCodePageRange1,
      xHeight:       os2.sxHeight,
      capHeight:     os2.sCapHeight,
      typoAscender:  os2.sTypoAscender,
      typoDescender: os2.sTypoDescender,
      typoLineGap:   os2.sTypoLineGap,
      winAscent:     os2.usWinAscent,
      winDescent:    os2.usWinDescent,
    } : null,
    head: head ? {
      unitsPerEm:     head.unitsPerEm,
      created:        head.created,
      modified:       head.modified,
      indexToLocFormat: head.indexToLocFormat,
    } : null,
    post: post ? {
      italicAngle:    post.italicAngle,
      isFixedPitch:   post.isFixedPitch,
    } : null,
    totalGlyphs: font.glyphs.length,
  };
}

function getUnicodeRanges(os2) {
  // Bit 25 = Kannada block
  const ranges = [];
  const r1 = os2.ulUnicodeRange1 || 0;
  const r2 = os2.ulUnicodeRange2 || 0;
  const r3 = os2.ulUnicodeRange3 || 0;
  const r4 = os2.ulUnicodeRange4 || 0;

  const all = [r1, r2, r3, r4];
  const RANGE_NAMES = {
    25: 'Kannada (U+0C80–U+0CFF)',
    0:  'Basic Latin',
    1:  'Latin-1 Supplement',
    15: 'Devanagari',
    26: 'Telugu',
    27: 'Malayalam',
  };

  for (const [bit, name] of Object.entries(RANGE_NAMES)) {
    const wordIndex = Math.floor(bit / 32);
    const bitIndex = bit % 32;
    if (all[wordIndex] & (1 << bitIndex)) {
      ranges.push(name);
    }
  }

  return {
    hasKannada: !!(r1 & (1 << 25)),
    declaredRanges: ranges,
    raw: { r1, r2, r3, r4 },
  };
}

// ─── Unicode / Glyph Coverage ───────────────────────────────────────────────

function analyzeUnicodeCoverage(font) {
  const results = KANNADA_CHARS.map(entry => {
    const glyphIndex = font.charToGlyphIndex(String.fromCodePoint(entry.cp));
    const hasGlyph = glyphIndex > 0;
    let advanceWidth = null;
    let glyphName = null;

    if (hasGlyph) {
      const glyph = font.glyphs.get(glyphIndex);
      advanceWidth = glyph ? glyph.advanceWidth : null;
      glyphName = glyph ? glyph.name : null;
    }

    return {
      ...entry,
      cpHex:       `U+${entry.cp.toString(16).toUpperCase().padStart(4, '0')}`,
      hasGlyph,
      glyphIndex:  hasGlyph ? glyphIndex : null,
      glyphName,
      advanceWidth,
    };
  });

  const required = results.filter(r => r.required);
  const revival  = results.filter(r => r.revival);

  return {
    all: results,
    byCategory: groupBy(results, 'cat'),
    stats: {
      total:           results.length,
      present:         results.filter(r => r.hasGlyph).length,
      missing:         results.filter(r => !r.hasGlyph).length,
      requiredTotal:   required.length,
      requiredPresent: required.filter(r => r.hasGlyph).length,
      requiredMissing: required.filter(r => !r.hasGlyph).length,
      revivalTotal:    revival.length,
      revivalPresent:  revival.filter(r => r.hasGlyph).length,
    },
    missingRequired: results.filter(r => r.required && !r.hasGlyph),
    missingRevival:  results.filter(r => r.revival  && !r.hasGlyph),
  };
}

// ─── OpenType Script / Feature Tables ────────────────────────────────────────

function analyzeScriptSupport(font) {
  const gsub = font.tables.gsub;
  const gpos = font.tables.gpos;

  return {
    gsub: getScriptRecords(gsub),
    gpos: getScriptRecords(gpos),
    hasKannadaScript: (
      recordsHaveScript(getScriptRecords(gsub), 'knda') ||
      recordsHaveScript(getScriptRecords(gpos), 'knda')
    ),
    hasDFLT: (
      recordsHaveScript(getScriptRecords(gsub), 'DFLT') ||
      recordsHaveScript(getScriptRecords(gpos), 'DFLT')
    ),
  };
}

function getScriptRecords(table) {
  // opentype.js exposes scriptList as table.scripts (array of {tag, script})
  const records = table?.scripts || table?.scriptList?.scriptRecords || [];
  return records.map(r => ({
    tag: r.tag,
    langSystems: (r.script?.langSysRecords || []).map(l => l.tag),
    defaultLangSys: !!r.script?.defaultLangSys,
  }));
}

function recordsHaveScript(records, tag) {
  return records.some(r => r.tag === tag);
}

// ─── OpenType Feature Analysis ───────────────────────────────────────────────

function analyzeFeatures(font) {
  const gsubFeatures = getFeatureList(font.tables.gsub);
  const gposFeatures = getFeatureList(font.tables.gpos);
  const allFeatureTags = new Set([
    ...gsubFeatures.map(f => f.tag),
    ...gposFeatures.map(f => f.tag),
  ]);

  const results = OT_FEATURES.map(def => {
    const inGsub = gsubFeatures.filter(f => f.tag === def.tag);
    const inGpos = gposFeatures.filter(f => f.tag === def.tag);
    const present = inGsub.length > 0 || inGpos.length > 0;

    return {
      ...def,
      present,
      gsubInstances: inGsub,
      gposInstances: inGpos,
      lookupCount: inGsub.reduce((s, f) => s + f.lookupCount, 0)
                 + inGpos.reduce((s, f) => s + f.lookupCount, 0),
    };
  });

  return {
    required:    results.filter(r => r.required),
    recommended: results.filter(r => !r.required),
    all:         results,
    allPresent:  results.filter(r => r.present).map(r => r.tag),
    stats: {
      requiredPresent: results.filter(r => r.required && r.present).length,
      requiredTotal:   results.filter(r => r.required).length,
      optionalPresent: results.filter(r => !r.required && r.present).length,
    },
  };
}

function getFeatureList(table) {
  // opentype.js exposes featureList as table.features (array of {tag, feature})
  // feature.lookupListIndexes (note: Indexes not Indices)
  const records = table?.features || table?.featureList?.featureRecords || [];
  return records.map(r => ({
    tag:         r.tag || r.featureTag,
    lookupCount: (r.feature?.lookupListIndexes || r.feature?.lookupListIndices || []).length,
    lookups:     r.feature?.lookupListIndexes || r.feature?.lookupListIndices || [],
  }));
}

// ─── GSUB Deep Analysis ──────────────────────────────────────────────────────

function analyzeGSUB(font) {
  const gsub = font.tables.gsub;
  if (!gsub) return { present: false };

  const lookups = (gsub.lookups || gsub.lookupList?.lookups || []).map((lookup, idx) => {
    const typeName = GSUB_LOOKUP_TYPES[lookup.lookupType] || `Type ${lookup.lookupType}`;
    const ruleCount = countGSUBRules(lookup);

    return {
      index:    idx,
      type:     lookup.lookupType,
      typeName,
      flag:     lookup.lookupFlag,
      ruleCount,
      subtableCount: (lookup.subtables || []).length,
    };
  });

  const typeBreakdown = {};
  for (const l of lookups) {
    typeBreakdown[l.typeName] = (typeBreakdown[l.typeName] || 0) + 1;
  }

  // Build feature → lookup mapping
  const featureToLookups = {};
  for (const f of getFeatureList(gsub)) {
    const tag = f.tag;
    if (!featureToLookups[tag]) featureToLookups[tag] = [];
    for (const li of f.lookups) {
      if (!featureToLookups[tag].includes(li)) {
        featureToLookups[tag].push(li);
      }
    }
  }

  return {
    present:       true,
    lookupCount:   lookups.length,
    lookups,
    typeBreakdown,
    featureToLookups,
    totalRules:    lookups.reduce((s, l) => s + l.ruleCount, 0),
    scriptRecords: getScriptRecords(gsub),
    featureRecords: getFeatureList(gsub),
  };
}

function countGSUBRules(lookup) {
  let count = 0;
  for (const sub of (lookup.subtables || [])) {
    if (sub.substFormat === 1) {
      // LigatureSubstFormat1
      if (sub.ligatureSets) {
        for (const set of sub.ligatureSets) {
          count += (set.ligatures || set).length || 0;
        }
      } else if (sub.glyphs) {
        count += sub.glyphs.length;
      } else {
        count += 1;
      }
    } else if (sub.coverage) {
      count += (sub.coverage.glyphs || []).length || 1;
    } else {
      count += 1;
    }
  }
  return count || (lookup.subtables || []).length;
}

// ─── GPOS Deep Analysis ──────────────────────────────────────────────────────

function analyzeGPOS(font) {
  const gpos = font.tables.gpos;
  if (!gpos) return { present: false };

  const lookups = (gpos.lookups || gpos.lookupList?.lookups || []).map((lookup, idx) => {
    const typeName = GPOS_LOOKUP_TYPES[lookup.lookupType] || `Type ${lookup.lookupType}`;
    return {
      index:         idx,
      type:          lookup.lookupType,
      typeName,
      flag:          lookup.lookupFlag,
      subtableCount: (lookup.subtables || []).length,
    };
  });

  const typeBreakdown = {};
  for (const l of lookups) {
    typeBreakdown[l.typeName] = (typeBreakdown[l.typeName] || 0) + 1;
  }

  // Count mark anchors from Mark-to-Base and Mark-to-Mark lookups
  let markAnchorCount = 0;
  for (const lookup of (gpos.lookups || gpos.lookupList?.lookups || [])) {
    if (lookup.lookupType === 4 || lookup.lookupType === 6) {
      for (const sub of (lookup.subtables || [])) {
        if (sub.markArray) {
          markAnchorCount += (sub.markArray.markRecords || []).length;
        }
      }
    }
  }

  return {
    present:       true,
    lookupCount:   lookups.length,
    lookups,
    typeBreakdown,
    markAnchorCount,
    hasKerning:    lookups.some(l => l.type === 2),
    hasMarkPos:    lookups.some(l => l.type === 4),
    hasMkmk:       lookups.some(l => l.type === 6),
    scriptRecords: getScriptRecords(gpos),
    featureRecords: getFeatureList(gpos),
  };
}

// ─── Glyph Inventory ────────────────────────────────────────────────────────

function analyzeGlyphs(font) {
  const glyphs = [];
  const unitsPerEm = font.unitsPerEm || 1000;

  for (let i = 0; i < font.glyphs.length; i++) {
    const g = font.glyphs.get(i);
    if (!g) continue;

    // Find Unicode(s) for this glyph
    const unicodes = g.unicodes || (g.unicode ? [g.unicode] : []);

    glyphs.push({
      index:        i,
      name:         g.name || `.glyph${i}`,
      unicodes:     unicodes.map(u => `U+${u.toString(16).toUpperCase().padStart(4, '0')}`),
      advanceWidth: g.advanceWidth,
      isKannada:    unicodes.some(u => u >= 0x0C80 && u <= 0x0CFF),
      isEmpty:      !g.path || (g.path.commands || []).length === 0,
    });
  }

  const kannadaGlyphs = glyphs.filter(g => g.isKannada);
  const emptyGlyphs   = glyphs.filter(g => g.isEmpty && g.name !== '.notdef' && g.unicodes.length > 0);

  return {
    total:          glyphs.length,
    kannadaCount:   kannadaGlyphs.length,
    emptyCount:     emptyGlyphs.length,
    emptyGlyphs,
    glyphs,
    unitsPerEm,
    // Advance width statistics for Kannada glyphs
    advanceStats:   computeAdvanceStats(kannadaGlyphs),
  };
}

function computeAdvanceStats(glyphs) {
  const widths = glyphs
    .filter(g => g.advanceWidth !== null && g.advanceWidth !== undefined)
    .map(g => g.advanceWidth);

  if (widths.length === 0) return null;

  widths.sort((a, b) => a - b);
  const mean = widths.reduce((s, w) => s + w, 0) / widths.length;
  const median = widths[Math.floor(widths.length / 2)];
  const min = widths[0];
  const max = widths[widths.length - 1];

  // Detect outliers: more than 2× median or less than 0.5× median
  const outliers = glyphs.filter(g => {
    const w = g.advanceWidth;
    return w !== null && w !== undefined && median > 0 &&
           (w > median * 2.5 || (w < median * 0.3 && w > 0));
  });

  return { mean: Math.round(mean), median, min, max, outliers };
}

// ─── Issue Generation ────────────────────────────────────────────────────────

function generateIssues(analysis) {
  const issues = [];

  // Metadata issues
  if (analysis.metadata.missing.length > 0) {
    issues.push({
      severity: 'warning',
      category: 'Metadata',
      message:  `Missing metadata fields: ${analysis.metadata.missing.join(', ')}`,
    });
  }

  if (!analysis.metadata.os2?.unicodeRanges?.hasKannada) {
    issues.push({
      severity: 'error',
      category: 'Metadata',
      message:  'OS/2 Unicode range bit 25 (Kannada) is not set',
    });
  }

  // Coverage issues
  for (const m of analysis.coverage.missingRequired) {
    issues.push({
      severity: 'error',
      category: 'Unicode Coverage',
      message:  `Missing required glyph: ${m.char} ${m.cpHex} – ${m.name}`,
    });
  }

  if (analysis.coverage.missingRevival.length > 0) {
    issues.push({
      severity: 'info',
      category: 'Unicode Coverage',
      message:  `Missing ${analysis.coverage.missingRevival.length} revival/archaic glyph(s): ` +
                analysis.coverage.missingRevival.map(r => `${r.char} (${r.cpHex})`).join(', '),
    });
  }

  // Script table issues
  if (!analysis.scripts.hasKannadaScript) {
    issues.push({
      severity: 'error',
      category: 'Script Tables',
      message:  'No "knda" script record found in GSUB or GPOS tables',
    });
  }

  // Feature issues
  const missingRequired = analysis.features.required.filter(f => !f.present);
  for (const f of missingRequired) {
    issues.push({
      severity: 'error',
      category: 'OpenType Features',
      message:  `Missing required feature "${f.tag}" (${f.name}): ${f.desc}`,
    });
  }

  // GPOS issues
  if (!analysis.gpos.present) {
    issues.push({
      severity: 'error',
      category: 'GPOS',
      message:  'No GPOS table found – mark positioning will not work',
    });
  } else if (!analysis.gpos.hasMarkPos) {
    issues.push({
      severity: 'error',
      category: 'GPOS',
      message:  'No Mark-to-Base positioning (lookup type 4) found – vowel signs may not attach correctly',
    });
  }

  // Empty glyphs
  if (analysis.glyphs.emptyCount > 0) {
    const names = analysis.glyphs.emptyGlyphs.slice(0, 5).map(g => g.name).join(', ');
    issues.push({
      severity: 'warning',
      category: 'Glyphs',
      message:  `${analysis.glyphs.emptyCount} glyph(s) have Unicode mappings but no path data (e.g. ${names})`,
    });
  }

  // Advance width outliers
  const stats = analysis.glyphs.advanceStats;
  if (stats && stats.outliers.length > 0) {
    issues.push({
      severity: 'warning',
      category: 'Glyphs',
      message:  `${stats.outliers.length} Kannada glyph(s) have unusual advance widths vs. median (${stats.median} units)`,
    });
  }

  return issues;
}

// ─── Score Calculation ───────────────────────────────────────────────────────

function calculateScore(analysis) {
  const scores = {};

  // 1. Metadata completeness (10 pts)
  const metaFields = Object.values(analysis.metadata.fields);
  const keyFields  = ['fontFamily','designer','license','version','copyright'];
  const keyPresent = keyFields.filter(k => analysis.metadata.fields[k]?.present).length;
  scores.metadata = Math.round((keyPresent / keyFields.length) * 10);

  // 2. Required Unicode coverage (40 pts)
  const { requiredPresent, requiredTotal } = analysis.coverage.stats;
  scores.coverage = Math.round((requiredPresent / requiredTotal) * 40);

  // 3. Required OT features (30 pts)
  const { requiredPresent: fp, requiredTotal: ft } = analysis.features.stats;
  scores.features = Math.round((fp / ft) * 30);

  // 4. Script table (10 pts)
  scores.scripts = (analysis.scripts.hasKannadaScript ? 8 : 0) +
                   (analysis.gpos.present ? 2 : 0);

  // 5. Revival / archaic glyphs (10 pts bonus)
  const { revivalPresent, revivalTotal } = analysis.coverage.stats;
  scores.revival = revivalTotal > 0
    ? Math.round((revivalPresent / revivalTotal) * 10)
    : 5; // neutral if none expected

  const total = Math.min(100, Object.values(scores).reduce((s, v) => s + v, 0));

  return {
    total,
    breakdown: scores,
    grade: total >= 90 ? 'A' : total >= 75 ? 'B' : total >= 60 ? 'C' : total >= 40 ? 'D' : 'F',
  };
}

// ─── Main Analyzer ───────────────────────────────────────────────────────────

/**
 * Run all checks on a font file and return a structured report object.
 * @param {string} filePath
 * @returns {object}
 */
function analyzeFont(filePath) {
  const font = loadFont(filePath);
  const path = require('path');

  const metadata = analyzeMetadata(font);
  const coverage = analyzeUnicodeCoverage(font);
  const scripts  = analyzeScriptSupport(font);
  const features = analyzeFeatures(font);
  const gsub     = analyzeGSUB(font);
  const gpos     = analyzeGPOS(font);
  const glyphs   = analyzeGlyphs(font);

  const partialAnalysis = { metadata, coverage, scripts, features, gsub, gpos, glyphs };
  const issues = generateIssues(partialAnalysis);
  const score  = calculateScore(partialAnalysis);

  return {
    meta: {
      tool:       'Kannada Font Quality Inspector',
      version:    '1.0.0',
      timestamp:  new Date().toISOString(),
      fontFile:   path.basename(filePath),
      fontPath:   filePath,
    },
    score,
    issues,
    metadata,
    coverage,
    scripts,
    features,
    gsub,
    gpos,
    glyphs,
  };
}

// ─── Comparison / Diff ───────────────────────────────────────────────────────

/**
 * Compare two report objects and return a diff summary.
 */
function compareReports(oldReport, newReport) {
  const diff = {
    timestamp:   new Date().toISOString(),
    old:         { file: oldReport.meta.fontFile, timestamp: oldReport.meta.timestamp, score: oldReport.score.total },
    new:         { file: newReport.meta.fontFile, timestamp: newReport.meta.timestamp, score: newReport.score.total },
    scoreDelta:  newReport.score.total - oldReport.score.total,
    coverage:    diffCoverage(oldReport.coverage, newReport.coverage),
    features:    diffFeatures(oldReport.features, newReport.features),
    issues:      diffIssues(oldReport.issues, newReport.issues),
    glyphs:      diffGlyphs(oldReport.glyphs, newReport.glyphs),
  };
  return diff;
}

function diffCoverage(oldCov, newCov) {
  const oldPresent = new Set(oldCov.all.filter(r => r.hasGlyph).map(r => r.cpHex));
  const newPresent = new Set(newCov.all.filter(r => r.hasGlyph).map(r => r.cpHex));

  return {
    added:   newCov.all.filter(r =>  newPresent.has(r.cpHex) && !oldPresent.has(r.cpHex)),
    removed: newCov.all.filter(r => !newPresent.has(r.cpHex) &&  oldPresent.has(r.cpHex)),
    statsOld: oldCov.stats,
    statsNew: newCov.stats,
  };
}

function diffFeatures(oldFeat, newFeat) {
  const oldTags = new Set(oldFeat.allPresent);
  const newTags = new Set(newFeat.allPresent);
  return {
    added:   [...newTags].filter(t => !oldTags.has(t)),
    removed: [...oldTags].filter(t => !newTags.has(t)),
  };
}

function diffIssues(oldIssues, newIssues) {
  const oldMsgs = new Set(oldIssues.map(i => i.message));
  const newMsgs = new Set(newIssues.map(i => i.message));
  return {
    resolved:    oldIssues.filter(i => !newMsgs.has(i.message)),
    introduced:  newIssues.filter(i => !oldMsgs.has(i.message)),
    unchanged:   newIssues.filter(i =>  oldMsgs.has(i.message)),
  };
}

function diffGlyphs(oldG, newG) {
  return {
    totalDelta:     newG.total   - oldG.total,
    kannadaDelta:   newG.kannadaCount - oldG.kannadaCount,
    emptyDelta:     newG.emptyCount   - oldG.emptyCount,
  };
}

// ─── Utilities ───────────────────────────────────────────────────────────────

function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const k = item[key];
    if (!acc[k]) acc[k] = [];
    acc[k].push(item);
    return acc;
  }, {});
}

module.exports = { analyzeFont, compareReports, loadFont };
