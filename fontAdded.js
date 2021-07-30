
const fs = require('fs')

const pre_path = '../Fonts/'

const css_path = "./static/css/fonts.css"

const fonts_json = "fonts.json"

const {
    font_extentions,
    old_fonts
} = require('./configuaration')

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
    const all_files = getFiles('./static/Fonts/')
    css = ''
    obj = {}
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
            css += '@font-face {\n\tfont-family: "'+font_name+'";\n\tsrc: url("'+font_address+'");\n\n}'
            if(!obj[font_family_link]){
                obj[font_family_link] = {
                    family: font_family,
                    link: font_family_link,
                    fonts: [{font: font_name, link: font_name_link}]
                }
            }
            else{
                obj[font_family_link]['fonts'].push({font: font_name, link: font_name_link})
            }
        }
    })
    fs.writeFileSync(css_path,css)
    fs.writeFileSync(fonts_json,JSON.stringify(obj,null,'\t'),'utf8')
    console.log('completed')
}


fontInitialize()