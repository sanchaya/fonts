const { json } = require('express')
const fs = require('fs')
const { prefix_name, all_conjuncts, maxDataPerPage} = require('../../configuaration')

var vowels_length

var consonent_length

var fonts_json = "fonts.json"

var new_fonts_json = "newFonts.json"

var extention = '.json'





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
        let json_raw = fs.readFileSync(prefix_name+all_conjuncts[i]+extention)
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
/*
var getFonts = (val, page) =>{
    let bytes = fs.readFileSync(fonts_json)
    let json = JSON.parse(bytes)
    let ar = Object.keys(json).map((key)=>{
        return json[key]
    })
    let filter = ar.filter( data =>{
        if(data.font.toLowerCase().includes(val.toLowerCase())){
            return true
        }
    })
    const min = getMinimum(filter.length, page*maxDataPerPage)
    const min_for_starting = getMinimum(filter.length, (page-1)*maxDataPerPage)
    const sendingData = filter.slice(min_for_starting, min)
    let isLastPage = false
    if(min==filter.length)
        isLastPage = true
    
    const parsingData = {
        data:sendingData,
        isLastPage: isLastPage
    }
    return parsingData
}
*/

var getFonts = (val, page) =>{
    let bytes = fs.readFileSync(new_fonts_json)
    let json = JSON.parse(bytes)
    let ar = Object.keys(json).map((key)=>{
        return json[key]
    })

    let filter = ar.filter( data =>{
        if(data.family.toLowerCase().includes(val.toLowerCase())){
            return true
        }
    })
    
    let result = filter.map( data => {
        const first_font = data['fonts'][0]['font']
        const obj = {
            font: first_font,
            family: data.family,
            link: data.link
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
        isLastPage: isLastPage
    }
    console.log(parsingData)
    return parsingData
}

var getFontFromParam = (param) =>{
    let bytes = fs.readFileSync(fonts_json)
    let json = JSON.parse(bytes)
    let result = json[param]
    return result
}


module.exports = {
    get_all_data,
    get_all_conjuncts,
    getFonts,
    getFontFromParam
}