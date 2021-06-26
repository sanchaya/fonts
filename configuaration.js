const port = process.env.PORT || 3001

const kannada_syllabary_json_location = "script/syllabary/syllabary_Kannada.json"

const prefix_name = "script/conjuncts/conjuncts_Kannada_"

const numerals = ["೦","೧","೨","೩","೪","೫","೬","೭","೮","೯"]

const all_conjuncts = ['a', 'ai', 'au', 'aḥ', 'aṃ', 'e', 'i', 'o', 'u', 'ā', 'ĕ', 'ī', 'ŏ', 'ū', 'ṛ']
                    
const conjuncts_in_json = ['conjuncts1S1','conjuncts2S1','conjuncts3S1','conjuncts4S1','conjuncts5S1']

const conjuncts_in_page = ['Final Consonants','2 Consonants', '3 Consonants', '4 Consonants', '5 Consonants']

const font_extentions = ['.ttf','.TTF','.pfm','.pfb','.PFM','.PFB','.VFB','.VTB','.vfb','.vtb']

const maxDataPerPage = 60

const pages = {
    fontPage:false,
    fontShowPage:false,
    errorPage:false
}

module.exports = {
    port:port,
    pages:pages,
    kannada_syllabary_json_location:kannada_syllabary_json_location,
    prefix_name:prefix_name,
    all_conjuncts:all_conjuncts,
    conjuncts_in_json:conjuncts_in_json,
    conjuncts_in_page:conjuncts_in_page,
    numerals:numerals,
    font_extentions:font_extentions,
    maxDataPerPage:maxDataPerPage
}
