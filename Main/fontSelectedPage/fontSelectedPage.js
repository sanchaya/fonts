const fs = require('fs')
const path = require('path')
const {maxDataPerPage} = require('../../configuaration')

let fontsCache = null
let fontsCacheTime = 0
const CACHE_TTL = 60000

let metadataCache = null
const getMetadata = () => {
    if (metadataCache) return metadataCache
    try {
        const bytes = fs.readFileSync(path.join(__dirname, '..', '..', 'fontMetadata.json'))
        metadataCache = JSON.parse(bytes)
    } catch {
        metadataCache = {}
    }
    return metadataCache
}

const getLicenseType = (license) => {
    if (!license) return 'Unknown'
    const lic = license.toLowerCase()
    const openSourceIndicators = ['ofl', 'sil', 'mit license', 'apache', 'gnu', 'public domain', 'ubuntu']
    const isOpenSource = openSourceIndicators.some(ind => lic.includes(ind))
    return isOpenSource ? 'Open Source' : 'Proprietary'
}

const getFontsJson = () => {
    const now = Date.now()
    if (fontsCache && (now - fontsCacheTime) < CACHE_TTL) {
        return fontsCache
    }
    const bytes = fs.readFileSync(path.join(__dirname, '..', '..', 'fonts.json'))
    fontsCache = JSON.parse(bytes)
    fontsCacheTime = now
    return fontsCache
}





var get_vowels_from_data = (json) =>{
    let vowels = json.vowels
    vowels_length = vowels.length
    return vowels
}

var get_consonent_from_data = (json) =>{
    let consonants = json.consonants
    consonent_length = consonants.length
    return consonants
}

var get_compound_from_data = (json) =>{
    let compounds = [] 

    for(let i=0; i<consonent_length; i++){
        let compound = json.compounds.slice(i*(vowels_length+1),i*(vowels_length+1)+vowels_length)
        compounds.push(compound)
    }
    return compounds
}

var get_all_conjuncts = (prefix_name, all_conjuncts) =>{
    let all_json_conjuncts = []
    for(let i=0; i<all_conjuncts.length; i++){
        let json_raw = fs.readFileSync(prefix_name+all_conjuncts[i]+".json")
        all_json_conjuncts.push(JSON.parse(json_raw))
    }
    return all_json_conjuncts
}

var get_all_data = (path_to_json) =>{
    let parsingData = {
        vowels:[],
        consonants:[],
        compounds:[]
    }

    const data = fs.readFileSync(path_to_json)

    const json = JSON.parse(data)
    parsingData.vowels = get_vowels_from_data(json)
    parsingData.consonants = get_consonent_from_data(json)
    parsingData.compounds = get_compound_from_data(json)

    return parsingData
}


var getMinimum = (val1, val2) =>{
    if(val1<val2)
        return val1
    return val2
}

var getFontsForFamilyPage = (family) => {
    const json = getFontsJson()
    return json[family]
}

var getFonts = (val, page) =>{
    const json = getFontsJson()
    const metadata = getMetadata()
    let ar = Object.keys(json).map((key)=>{
        return json[key]
    })
    
    val = val || ''
    page = parseInt(page) || 1

    let filter = ar.filter( data =>{
        if(data.family && data.family.toLowerCase().includes(val.toLowerCase())){
            return true
        }
    })
    
    let result = filter.map( data => {
        const first_font = data['fonts'][0]['font']
        const fontMeta = metadata[data.link] || {}
        const obj = {
            font: first_font,
            family: data.family,
            link: data.link,
            styles: data['fonts'].length,
            author: fontMeta.author || '',
            foundry: fontMeta.foundry || '',
            licenseType: getLicenseType(fontMeta.license)
        }
        return obj
    })
    const min = getMinimum(result.length, page*maxDataPerPage)
    const min_for_starting = getMinimum(result.length, (page-1)*maxDataPerPage)
    const sendingData = result.slice(min_for_starting, min)
    let isLastPage = false
    if(min==result.length)
        isLastPage = true
    
    const parsingData = {
        data:sendingData,
        totalFamily: Object.keys(json).length,
        showingFamily: filter.length,
        isLastPage: isLastPage
    }
    
    return parsingData
}

var getFontFromParam = (param) =>{
    const json = getFontsJson()
    const family = param.family
    const font = param.font
    try{
        let result = json[family]['fonts']
        return result.find( ele => ele.link === font)
    }catch(e){
        return false
    }
    return false
}


module.exports = {
    get_all_data,
    get_all_conjuncts,
    getFonts,
    getFontFromParam,
    getFontsForFamilyPage
}