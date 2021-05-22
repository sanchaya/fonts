
const fs = require('fs')

const pre_path = '../Fonts/'

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
    all_files.forEach( file =>{
        console.log(file)
    })
}


fontInitialize()