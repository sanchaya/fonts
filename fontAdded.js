const fs = require('fs')

const pre_path = '../Fonts/'
const css_path = "./static/css/fonts.css"
const fonts_json = "fonts.json"

const {
    font_extentions,
    old_fonts
} = require('./configuration')

const getFiles = path => {
    const files = []
    for (const file of fs.readdirSync(path)) {
        const fullPath = path + '/' + file
        if(fs.lstatSync(fullPath).isDirectory())
            getFiles(fullPath).forEach(x => files.push(file + '/' + x))
        else files.push(file)
    }
    return files
}

var fontName = file => {
    let fileAr = file.split('')
    for(let i=fileAr.length-1; i>=0; i--){
        if(fileAr[i] == '/')
            return file.slice(i+1, fileAr.length)
    }
    return file
}

var fontFamily = file =>  {
    let fileAr = file.split('')
    const ind = fileAr.findIndex( ele => ele == '/')
    return file.slice(0, ind)
}

var fontInitialize = () =>{
    const old_data = fs.existsSync(fonts_json)
        ? JSON.parse(fs.readFileSync(fonts_json, 'utf8'))
        : {}
    const old_css = fs.existsSync(css_path)
        ? fs.readFileSync(css_path, 'utf8')
        : ''

    const all_files = getFiles('./static/Fonts/')
    const new_obj = {}
    const new_css_entries = []

    all_files.forEach( file =>{
        extention = font_extentions.find( a => {
            if(file.includes(a)){
                return a
            }
            return false
        })
        if(extention){
            let font_name = fontName(file).replace(/-/g, ' ').replace(/_/g, ' ').replace(extention, '')
            const font_family = fontFamily(file).replace(/-/g, ' ').replace(/_/g, ' ')
            let font_name_link = fontName(file).replace(/ /g, '-').replace(/_/g, '-').replace(extention, '')
            const font_family_link = fontFamily(file).replace(/ /g, '-').replace(/_/g, '-')
            if(old_fonts.includes(extention)){
                font_name = "old " + extention + " " + font_name
                font_name_link = "old-" + extention + "-" + font_name_link
            }
            font_address = pre_path + file
            if(!new_obj[font_family_link]){
                new_obj[font_family_link] = {
                    family: font_family,
                    link: font_family_link,
                    fonts: [{font: font_name, link: font_name_link}]
                }
            }
            else{
                new_obj[font_family_link]['fonts'].push({font: font_name, link: font_name_link})
            }
        }
        console.log("File:", file, "Extension:", extention);
    })

    // Build set of all existing font names from old_data
    const existing_font_links = new Set()
    for (const entry of Object.values(old_data)) {
        for (const f of entry.fonts) {
            if (f.link) existing_font_links.add(f.link)
        }
    }

    // Merge: keep existing curated entries, add new families whose fonts aren't already referenced
    const merged = { ...old_data }
    for (const key of Object.keys(new_obj)) {
        if (!(key in old_data)) {
            const is_new = !new_obj[key].fonts.some(f => existing_font_links.has(f.link))
            if (is_new) {
                merged[key] = new_obj[key]
            }
        }
    }

    fs.writeFileSync(fonts_json, JSON.stringify(merged, null, '\t'), 'utf8')

    // Merge CSS: keep old declarations, append new ones for new families
    const existing_families = new Set()
    if (old_css) {
        const family_regex = /font-family:\s*"([^"]+)"/g
        let match
        while ((match = family_regex.exec(old_css)) !== null) {
            existing_families.add(match[1])
        }
    }

    let new_css = old_css
    const generated_css_entries = {}

    // Build CSS entries grouped by font family
    for (const file of all_files) {
        extention = font_extentions.find(a => {
            if(file.includes(a)) return a
            return false
        })
        if(extention){
            let font_name = fontName(file).replace(/-/g, ' ').replace(/_/g, ' ').replace(extention, '')
            const font_family_str = fontFamily(file).replace(/-/g, ' ').replace(/_/g, ' ')
            let font_name_link = fontName(file).replace(/ /g, '-').replace(/_/g, '-').replace(extention, '')
            const font_family_link = fontFamily(file).replace(/ /g, '-').replace(/_/g, '-')
            if(old_fonts.includes(extention)){
                font_name = "old " + extention + " " + font_name
                font_name_link = "old-" + extention + "-" + font_name_link
            }
            const font_address = pre_path + file
            if (!generated_css_entries[font_family_link]) {
                generated_css_entries[font_family_link] = ''
            }
            generated_css_entries[font_family_link] += '@font-face {\n\tfont-family: "'+font_name+'";\n\tsrc: url("'+font_address+'");\n\n}'
        }
    }

    // Append only truly new families to CSS
    for (const key of Object.keys(generated_css_entries)) {
        if (!(key in old_data)) {
            const is_new = !existing_font_links.has(new_obj[key]?.fonts?.[0]?.link)
            if (is_new) {
                new_css += generated_css_entries[key]
            }
        }
    }

    fs.writeFileSync(css_path, new_css)
    console.log('completed')
}

fontInitialize()
