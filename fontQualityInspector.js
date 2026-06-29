const fs = require('fs')
const path = require('path')
const opentype = require('opentype.js')
const { analyzeFont } = require('./font-checker/analyzer')

const KANNADA_START = 0x0C80
const KANNADA_END = 0x0CFF

const LATIN_START = 0x0020
const LATIN_END = 0x007E

const DIGITS = [0x0030, 0x0031, 0x0032, 0x0033, 0x0034, 0x0035, 0x0036, 0x0037, 0x0038, 0x0039]

const KANNADA_ESSENTIAL = [
  0x0C85, 0x0C86, 0x0C87, 0x0C88, 0x0C89, 0x0C8A, 0x0C8B, 0x0C8C,
  0x0C8E, 0x0C8F, 0x0C90, 0x0C92, 0x0C93, 0x0C94,
  0x0C95, 0x0C96, 0x0C97, 0x0C98, 0x0C99, 0x0C9A, 0x0C9B, 0x0C9C, 0x0C9D, 0x0C9E,
  0x0C9F, 0x0CA0, 0x0CA1, 0x0CA2, 0x0CA3, 0x0CA4, 0x0CA5, 0x0CA6, 0x0CA7, 0x0CA8,
  0x0CAA, 0x0CAB, 0x0CAC, 0x0CAD, 0x0CAE, 0x0CAF,
  0x0CB0, 0x0CB1, 0x0CB2, 0x0CB3, 0x0CB5, 0x0CB6, 0x0CB7, 0x0CB8, 0x0CB9,
  0x0CBE, 0x0CBF, 0x0CC0, 0x0CC1, 0x0CC2, 0x0CC3, 0x0CC4, 0x0CC6, 0x0CC7, 0x0CC8,
  0x0CCA, 0x0CCB, 0x0CCC, 0x0CCD
]

const PUNCTUATION = [
  0x0021, 0x0022, 0x0027, 0x0028, 0x0029, 0x002C, 0x002D, 0x002E,
  0x003A, 0x003B, 0x003F, 0x00AB, 0x00BB, 0x2013, 0x2014, 0x2018,
  0x2019, 0x201C, 0x201D, 0x2026
]

const ESSENTIAL_OT_FEATURES = ['akhn', 'blwf', 'half', 'pstf', 'pres']
const IMPORTANT_OT_FEATURES = ['abvs', 'blws', 'psts', 'abvf', 'cjct', 'init', 'medi', 'fina']
const GENERAL_OT_FEATURES = ['liga', 'kern', 'mark', 'mkmk', 'dist', 'rlig', 'clig', 'locl']

const GSUB_FEATURES = ['akhn', 'blwf', 'half', 'pstf', 'pres', 'abvs', 'blws', 'psts', 'abvf', 'cjct', 'init', 'medi', 'fina', 'rlig', 'clig', 'liga', 'dlig', 'ccmp', 'isol', 'fina', 'medi', 'init']
const GPOS_FEATURES = ['kern', 'mark', 'mkmk', 'dist', 'abvm', 'blwm']

const hasGlyph = (font, unicode) => {
  try {
    const glyph = font.charToGlyph(String.fromCodePoint(unicode))
    return glyph.index !== 0
  } catch {
    return false
  }
}

const countCoverage = (font, chars) => {
  let covered = 0
  for (const c of chars) {
    if (hasGlyph(font, c)) covered++
  }
  return covered
}

const computeQualityScore = (font, fontPath, familyMetadata, stylesCount) => {
  const allKannada = Array.from({length: 128}, (_, i) => KANNADA_START + i)
  const kannadaCovered = countCoverage(font, allKannada)
  const latinChars = Array.from({length: 95}, (_, i) => LATIN_START + i)
  const latinCovered = countCoverage(font, latinChars)
  const digitCovered = countCoverage(font, DIGITS)
  const punctCovered = countCoverage(font, PUNCTUATION)
  const essentialCovered = countCoverage(font, KANNADA_ESSENTIAL)

  let features = { all: [], gsub: [], gpos: [] }
  if (font.tables.gsub && font.tables.gsub.features) {
    features.gsub.push(...font.tables.gsub.features.map(f => f.tag))
  }
  if (font.tables.gpos && font.tables.gpos.features) {
    features.gpos.push(...font.tables.gpos.features.map(f => f.tag))
  }
  features.all = [...new Set([...features.gsub, ...features.gpos])]

  const names = font.names
  const ext = path.extname(fontPath).toLowerCase()

  /* ===== Categories ===== */

  // Coverage (40): Kannada 30 + Latin 5 + Digits 3 + Punctuation 2
  const kannadaScore = Math.min((kannadaCovered / 128) * 30, 30)
  const latinScore = Math.min((latinCovered / 95) * 5, 5)
  const digitScore = Math.min((digitCovered / 10) * 3, 3)
  const punctScore = Math.min((punctCovered / PUNCTUATION.length) * 2, 2)
  const coverageScore = Math.round((kannadaScore + latinScore + digitScore + punctScore) * 10) / 10

  // Metadata (10)
  let metaScore = 0
  if (names.designer && names.designer.en) metaScore += 2
  if (names.manufacturer && names.manufacturer.en) metaScore += 1
  if (names.version && names.version.en) metaScore += 1
  if (names.copyright && names.copyright.en) metaScore += 1
  if (names.license && names.license.en) metaScore += 3
  if (familyMetadata && familyMetadata.description) metaScore += 2

  // Features (30): OpenType 15 + Metrics 10 + Format 5
  let otScore = 0
  const essentialOt = features.all.filter(f => ESSENTIAL_OT_FEATURES.includes(f))
  otScore += Math.min(essentialOt.length * 2, 10)
  const importantOt = features.all.filter(f => IMPORTANT_OT_FEATURES.includes(f))
  otScore += Math.min(importantOt.length * 1, 5)
  const generalOt = features.all.filter(f => GENERAL_OT_FEATURES.includes(f))
  otScore += Math.min(generalOt.length * 0.5, 5)

  let metricsScore = 0
  const upm = font.unitsPerEm
  if (upm >= 1000 && upm <= 2048) metricsScore += 3
  else if (upm > 0) metricsScore += 1
  if (font.ascender > 0) metricsScore += 1.5
  if (font.descender < 0) metricsScore += 1.5
  const ratio = font.ascender / Math.abs(font.descender || 1)
  if (ratio >= 1.2 && ratio <= 2.5) metricsScore += 2
  if (font.numGlyphs > 200) metricsScore += 2
  else if (font.numGlyphs > 100) metricsScore += 1

  let formatScore = 0
  if (ext === '.otf') formatScore += 5
  else if (ext === '.ttf') formatScore += 3

  const featuresScore = Math.round((otScore + metricsScore + formatScore) * 10) / 10

  // Scripts (10): Essential Kannada characters
  const scriptsScore = Math.round((essentialCovered / KANNADA_ESSENTIAL.length) * 10 * 10) / 10

  // Revival (10): Family completeness + font quality indicators
  let revivalScore = 0
  // Has multiple styles
  if (stylesCount >= 4) revivalScore += 3
  else if (stylesCount >= 2) revivalScore += 2
  else revivalScore += 1
  // Font file size indicates comprehensiveness
  const stat = fs.statSync(fontPath)
  const fileSizeKB = stat.size / 1024
  if (fileSizeKB > 200) revivalScore += 3
  else if (fileSizeKB > 100) revivalScore += 2
  else if (fileSizeKB > 50) revivalScore += 1
  // Glyph count for comprehensive coverage
  if (font.numGlyphs > 400) revivalScore += 2
  else if (font.numGlyphs > 200) revivalScore += 1
  // Has both GSUB and GPOS
  if (features.gsub.length > 0 && features.gpos.length > 0) revivalScore += 2
  else if (features.gsub.length > 0 || features.gpos.length > 0) revivalScore += 1

  const totalScore = Math.min(Math.max(Math.round((coverageScore + metaScore + featuresScore + scriptsScore + revivalScore) * 10) / 10, 0), 100)

  /* ===== Issues & Error/Warning Counts ===== */
  const issues = []
  let errors = 0
  let warnings = 0

  if (essentialCovered < KANNADA_ESSENTIAL.length) {
    errors++
    issues.push({ severity: 'error', category: 'Scripts', message: `${KANNADA_ESSENTIAL.length - essentialCovered} essential Kannada characters missing` })
  }
  if (kannadaCovered < 64) {
    errors++
    issues.push({ severity: 'error', category: 'Coverage', message: `Kannada coverage below 50% (${kannadaCovered}/128)` })
  } else if (kannadaCovered < 115) {
    warnings++
    issues.push({ severity: 'warning', category: 'Coverage', message: `Kannada coverage ${kannadaCovered}/128 (${Math.round(kannadaCovered/128*100)}%)` })
  }
  if (features.all.length === 0) {
    errors++
    issues.push({ severity: 'error', category: 'Features', message: 'No OpenType features detected' })
  } else if (!essentialOt.includes('akhn')) {
    warnings++
    issues.push({ severity: 'warning', category: 'Features', message: 'Missing essential akhn (Akhand) feature for conjuncts' })
  }
  if (!features.gsub.some(f => GSUB_FEATURES.includes(f))) {
    errors++
    issues.push({ severity: 'error', category: 'Features', message: 'No GSUB rules for glyph substitution' })
  }
  if (!features.gpos.some(f => GPOS_FEATURES.includes(f))) {
    warnings++
    issues.push({ severity: 'warning', category: 'Features', message: 'No GPOS rules for glyph positioning' })
  }
  if (latinCovered < 52) {
    errors++
    issues.push({ severity: 'error', category: 'Coverage', message: 'Insufficient Latin character coverage' })
  }
  if (metaScore < 5) {
    warnings++
    issues.push({ severity: 'warning', category: 'Metadata', message: 'Font metadata is incomplete' })
  }
  if (font.numGlyphs < 100) {
    errors++
    issues.push({ severity: 'error', category: 'Metrics', message: `Very low glyph count (${font.numGlyphs})` })
  }

  const breakdown = {
    coverage: { score: coverageScore, max: 40, covered: kannadaCovered, total: 128, label: 'Coverage', sub: {
      kannada: { score: Math.round(kannadaScore*10)/10, max: 30, covered: kannadaCovered, total: 128, label: 'Kannada Unicode' },
      latin: { score: Math.round(latinScore*10)/10, max: 5, covered: latinCovered, total: 95, label: 'Basic Latin' },
      digits: { score: Math.round(digitScore*10)/10, max: 3, covered: digitCovered, total: 10, label: 'Digits' },
      punctuation: { score: Math.round(punctScore*10)/10, max: 2, covered: punctCovered, total: PUNCTUATION.length, label: 'Punctuation' }
    }},
    metadata: { score: metaScore, max: 10, label: 'Metadata' },
    features: { score: featuresScore, max: 30, label: 'Features', sub: {
      openType: { score: Math.round(otScore*10)/10, max: 15, covered: features.all.length, total: features.all.length, label: 'OpenType Features', features: features.all },
      metrics: { score: Math.round(metricsScore*10)/10, max: 10, label: 'Font Metrics', unitsPerEm: upm, ascender: font.ascender, descender: font.descender, glyphCount: font.numGlyphs },
      format: { score: formatScore, max: 5, label: 'Font Format', format: ext }
    }},
    scripts: { score: scriptsScore, max: 10, covered: essentialCovered, total: KANNADA_ESSENTIAL.length, label: 'Scripts' },
    revival: { score: Math.round(revivalScore*10)/10, max: 10, label: 'Revival', stylesCount, fileSizeKB: Math.round(fileSizeKB*10)/10 }
  }

  return {
    totalScore,
    breakdown,
    issues,
    errors,
    warnings,
    overview: {
      unicodeCoverage: { kannada: { covered: kannadaCovered, total: 128 }, latin: { covered: latinCovered, total: 95 }, digits: { covered: digitCovered, total: 10 } },
      openTypeFeatures: features.all,
      gsubRules: features.gsub,
      gposRules: features.gpos,
      glyphInventory: font.numGlyphs,
      metadata: {
        familyName: names.fontFamily ? names.fontFamily.en : '',
        designer: names.designer ? names.designer.en : '',
        manufacturer: names.manufacturer ? names.manufacturer.en : '',
        version: names.version ? names.version.en : '',
        license: names.license ? names.license.en : '',
        copyright: names.copyright ? names.copyright.en : ''
      }
    }
  }
}

const getGrade = (score, errors) => {
  if (errors > 5) return { grade: 'F', label: 'Critical', color: '#d32f2f' }
  if (errors > 2) return { grade: 'D', label: 'Poor', color: '#e64a19' }
  if (score >= 90) return { grade: 'A', label: 'Excellent', color: '#2e7d32' }
  if (score >= 80) return { grade: 'B+', label: 'Very Good', color: '#388e3c' }
  if (score >= 70) return { grade: 'B', label: 'Good', color: '#689f38' }
  if (score >= 60) return { grade: 'C+', label: 'Satisfactory', color: '#f57f17' }
  if (score >= 50) return { grade: 'C', label: 'Average', color: '#e65100' }
  if (score >= 35) return { grade: 'D', label: 'Poor', color: '#e64a19' }
  return { grade: 'F', label: 'Critical', color: '#d32f2f' }
}

const inspectFont = (fontPath, familyMetadata, stylesCount) => {
  try {
    if (!fs.existsSync(fontPath)) return null
    const report = analyzeFont(fontPath)
    const errors = report.issues.filter(i => i.severity === 'error').length
    const warnings = report.issues.filter(i => i.severity === 'warning').length
    const grade = getGrade(report.score.total, errors)
    return {
      totalScore: report.score.total,
      grade: grade.grade,
      gradeLabel: grade.label,
      gradeColor: grade.color,
      errors,
      warnings,
      issues: report.issues,
      breakdown: {
        coverage: { score: report.score.breakdown.coverage, max: 40, label: 'Coverage' },
        features: { score: report.score.breakdown.features, max: 30, label: 'Features' },
        scripts:  { score: report.score.breakdown.scripts,  max: 10, label: 'Scripts' },
        metadata: { score: report.score.breakdown.metadata, max: 10, label: 'Metadata' },
        revival:  { score: report.score.breakdown.revival,  max: 10, label: 'Revival' }
      },
      fontFile: path.basename(fontPath),
      familyName: report.metadata.fields.fontFamily?.value || ''
    }
  } catch (err) {
    console.error(`Error inspecting font ${fontPath}:`, err.message)
    return null
  }
}

const getFontDir = (family) => {
  const underscoreDir = family.replace(/-/g, '_')
  const underscorePath = path.join(__dirname, 'static', 'Fonts', underscoreDir)
  if (fs.existsSync(underscorePath)) return underscoreDir
  return family
}

const inspectAllFonts = () => {
  const fonts = JSON.parse(fs.readFileSync(path.join(__dirname, 'fonts.json'), 'utf8'))
  const metadata = JSON.parse(fs.readFileSync(path.join(__dirname, 'fontMetadata.json'), 'utf8'))
  const results = {}

  const families = Object.keys(fonts)
  for (const family of families) {
    const familyData = fonts[family]
    const familyMeta = metadata[family] || {}
    const stylesCount = familyData.fonts ? familyData.fonts.length : 0

    const fontDir = getFontDir(family)
    const dirPath = path.join(__dirname, 'static', 'Fonts', fontDir)

    if (!fs.existsSync(dirPath)) {
      results[family] = { error: 'Font directory not found', totalScore: 0, grade: 'N/A', gradeLabel: 'Not Available', gradeColor: '#999', errors: 0, warnings: 0, issues: [], breakdown: {} }
      console.log(`Skipped ${family}: directory not found`)
      continue
    }

    const files = fs.readdirSync(dirPath)
    const fontFiles = files.filter(f => f.endsWith('.ttf') || f.endsWith('.otf'))

    if (fontFiles.length === 0) {
      results[family] = { error: 'No font files found', totalScore: 0, grade: 'N/A', gradeLabel: 'Not Available', gradeColor: '#999', errors: 0, warnings: 0, issues: [], breakdown: {} }
      console.log(`Skipped ${family}: no font files`)
      continue
    }

    const fontPath = path.join(dirPath, fontFiles[0])
    const result = inspectFont(fontPath, familyMeta, stylesCount)

    if (result) {
      results[family] = result
      const emoji = result.errors > 0 ? '!' : result.warnings > 0 ? 'i' : '✓'
      console.log(`${emoji} ${family}: ${result.totalScore} (${result.gradeLabel}) [${result.errors}E/${result.warnings}W]`)
    } else {
      results[family] = { error: 'Failed to inspect font', totalScore: 0, grade: 'F', gradeLabel: 'Error', gradeColor: '#999', errors: 0, warnings: 0, issues: [], breakdown: {} }
    }
  }

  return results
}

const saveQualityData = () => {
  console.log('Starting font quality inspection...')
  console.time('Quality inspection')
  const results = inspectAllFonts()
  console.timeEnd('Quality inspection')
  fs.writeFileSync(path.join(__dirname, 'fontQuality.json'), JSON.stringify(results, null, 2))
  console.log(`Quality data saved for ${Object.keys(results).length} families`)
  return results
}

if (require.main === module) {
  try {
    saveQualityData()
    console.log('Done!')
    process.exit(0)
  } catch (err) {
    console.error('Error:', err)
    process.exit(1)
  }
}

module.exports = { inspectFont, inspectAllFonts, saveQualityData, computeQualityScore, getGrade, getFontDir }
