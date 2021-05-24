
const fs = require('fs')

const pre_path = '../Fonts/'

const css_path = "./static/css/fonts.css"

const fonts_json = "fonts.json"

const {font_extentions} = require('./configuaration')

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
            font_link = file.replace(/\//g,'').replace(/ /g,'').replace(extention,'').replace(/_/g,'')
            font_family = file.replace(/\//g,' ').replace(extention,'').replace(/-/g,' ').replace(/_/g,' ')
            font_address = pre_path + file
            css += '@font-face {\n\tfont-family: "'+font_family+'";\n\tsrc: url("'+font_address+'");\n\n}'
            obj[font_link] = {
                font: font_family,
                name: font_link
            }
        }
    })
    fs.writeFileSync(css_path,css)
    fs.writeFileSync(fonts_json,JSON.stringify(obj,null,'\t'),'utf8')
}


fontInitialize()