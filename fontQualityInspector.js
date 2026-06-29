const fs = require('fs')
const path = require('path')
const opentype = require('opentype.js')

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

const computeQualityScore = (font, fontPath, familyMetadata) => {
  let totalScore = 0
  let breakdown = {}
  let details = {}

  const allKannada = Array.from({length: 128}, (_, i) => KANNADA_START + i)
  const kannadaCovered = countCoverage(font, allKannada)
  const kannadaScore = (kannadaCovered / 128) * 35
  totalScore += kannadaScore
  breakdown.kannadaCoverage = { score: kannadaScore, max: 35, covered: kannadaCovered, total: 128, label: 'Kannada Coverage' }

  const essentialCovered = countCoverage(font, KANNADA_ESSENTIAL)
  const essentialScore = (essentialCovered / KANNADA_ESSENTIAL.length) * 15
  totalScore += essentialScore
  breakdown.essentialChars = { score: essentialScore, max: 15, covered: essentialCovered, total: KANNADA_ESSENTIAL.length, label: 'Essential Kannada Chars' }

  const latinChars = Array.from({length: 95}, (_, i) => LATIN_START + i)
  const latinCovered = countCoverage(font, latinChars)
  const latinScore = (latinCovered / 95) * 5
  totalScore += latinScore
  breakdown.latinCoverage = { score: latinScore, max: 5, covered: latinCovered, total: 95, label: 'Basic Latin' }

  const digitCovered = countCoverage(font, DIGITS)
  const digitScore = (digitCovered / 10) * 5
  totalScore += digitScore
  breakdown.digits = { score: digitScore, max: 5, covered: digitCovered, total: 10, label: 'Digits' }

  const punctCovered = countCoverage(font, PUNCTUATION)
  const punctScore = (punctCovered / PUNCTUATION.length) * 5
  totalScore += punctScore
  breakdown.punctuation = { score: punctScore, max: 5, covered: punctCovered, total: PUNCTUATION.length, label: 'Punctuation' }

  let features = []
  if (font.tables.gsub && font.tables.gsub.features) {
    features.push(...font.tables.gsub.features.map(f => f.tag))
  }
  if (font.tables.gpos && font.tables.gpos.features) {
    features.push(...font.tables.gpos.features.map(f => f.tag))
  }
  features = [...new Set(features)]

  let otScore = 0
  const essentialOt = features.filter(f => ESSENTIAL_OT_FEATURES.includes(f))
  otScore += Math.min(essentialOt.length * 2, 10)
  const importantOt = features.filter(f => IMPORTANT_OT_FEATURES.includes(f))
  otScore += Math.min(importantOt.length * 1, 5)
  const generalOt = features.filter(f => GENERAL_OT_FEATURES.includes(f))
  otScore += Math.min(generalOt.length * 0.5, 5)
  totalScore += otScore
  breakdown.openType = { score: otScore, max: 15, covered: features.length, total: features.length, label: 'OpenType Features', features }

  let metaScore = 0
  const names = font.names
  if (names.fontFamily && names.fontFamily.en) metaScore += 1
  if (names.designer && names.designer.en) metaScore += 2
  if (names.manufacturer && names.manufacturer.en) metaScore += 1
  if (names.version && names.version.en) metaScore += 1
  if (names.copyright && names.copyright.en) metaScore += 1
  if (names.license && names.license.en) metaScore += 2
  if (familyMetadata && familyMetadata.description) metaScore += 2
  totalScore += metaScore
  breakdown.metadata = { score: metaScore, max: 10, label: 'Metadata' }

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
  totalScore += metricsScore
  breakdown.metrics = { score: metricsScore, max: 10, label: 'Font Metrics', unitsPerEm: upm, ascender: font.ascender, descender: font.descender, glyphCount: font.numGlyphs }

  let formatScore = 0
  const ext = path.extname(fontPath).toLowerCase()
  if (ext === '.otf') formatScore += 5
  else if (ext === '.ttf') formatScore += 3
  totalScore += formatScore
  breakdown.format = { score: formatScore, max: 5, label: 'Font Format', format: ext }

  totalScore = Math.round(totalScore * 10) / 10
  totalScore = Math.min(Math.max(totalScore, 0), 100)

  return { totalScore, breakdown }
}

const getGrade = (score) => {
  if (score >= 90) return { grade: 'A', label: 'Excellent', color: '#2e7d32' }
  if (score >= 80) return { grade: 'B+', label: 'Very Good', color: '#388e3c' }
  if (score >= 70) return { grade: 'B', label: 'Good', color: '#689f38' }
  if (score >= 60) return { grade: 'C+', label: 'Satisfactory', color: '#f57f17' }
  if (score >= 50) return { grade: 'C', label: 'Average', color: '#e65100' }
  if (score >= 35) return { grade: 'D', label: 'Poor', color: '#c62828' }
  return { grade: 'F', label: 'Very Poor', color: '#b71c1c' }
}

const inspectFont = async (fontPath, familyMetadata) => {
  try {
    if (!fs.existsSync(fontPath)) return null
    const font = await opentype.load(fontPath)
    const result = computeQualityScore(font, fontPath, familyMetadata)
    const grade = getGrade(result.totalScore)
    return {
      ...result,
      grade: grade.grade,
      gradeLabel: grade.label,
      gradeColor: grade.color,
      fontFile: path.basename(fontPath),
      familyName: font.names.fontFamily ? font.names.fontFamily.en : ''
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

const inspectAllFonts = async () => {
  const fonts = JSON.parse(fs.readFileSync(path.join(__dirname, 'fonts.json'), 'utf8'))
  const metadata = JSON.parse(fs.readFileSync(path.join(__dirname, 'fontMetadata.json'), 'utf8'))
  const results = {}

  const families = Object.keys(fonts)
  for (const family of families) {
    const familyData = fonts[family]
    const familyMeta = metadata[family] || {}

    const fontDir = getFontDir(family)
    const dirPath = path.join(__dirname, 'static', 'Fonts', fontDir)

    if (!fs.existsSync(dirPath)) {
      results[family] = { error: 'Font directory not found', totalScore: 0, grade: 'N/A', gradeLabel: 'Not Available', gradeColor: '#999' }
      console.log(`Skipped ${family}: directory not found`)
      continue
    }

    const files = fs.readdirSync(dirPath)
    const fontFiles = files.filter(f => f.endsWith('.ttf') || f.endsWith('.otf'))

    if (fontFiles.length === 0) {
      results[family] = { error: 'No font files found', totalScore: 0, grade: 'N/A', gradeLabel: 'Not Available', gradeColor: '#999' }
      console.log(`Skipped ${family}: no font files`)
      continue
    }

    const fontPath = path.join(dirPath, fontFiles[0])
    const result = await inspectFont(fontPath, familyMeta)

    if (result) {
      results[family] = result
      console.log(`Inspected ${family}: ${result.totalScore} (${result.gradeLabel})`)
    } else {
      results[family] = { error: 'Failed to inspect font', totalScore: 0, grade: 'F', gradeLabel: 'Error', gradeColor: '#999' }
    }
  }

  return results
}

const saveQualityData = async () => {
  console.log('Starting font quality inspection...')
  console.time('Quality inspection')
  const results = await inspectAllFonts()
  console.timeEnd('Quality inspection')
  fs.writeFileSync(path.join(__dirname, 'fontQuality.json'), JSON.stringify(results, null, 2))
  console.log(`Quality data saved for ${Object.keys(results).length} families`)
  return results
}

if (require.main === module) {
  saveQualityData().then(() => {
    console.log('Done!')
    process.exit(0)
  }).catch(err => {
    console.error('Error:', err)
    process.exit(1)
  })
}

module.exports = { inspectFont, inspectAllFonts, saveQualityData, computeQualityScore, getGrade, getFontDir }
