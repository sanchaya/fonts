const express = require('express')
const multer = require('multer');
const fileUpload = require('express-fileupload');
const {
    port, 
    pages, 
    kannada_syllabary_json_location,
    prefix_name,
    all_conjuncts,
    conjuncts_in_json,
    conjuncts_in_page,
    numerals
    } = require('./configuaration')

const router = express.Router()

const app = express()

const path = require('path')

const bodyParser = require('body-parser')

const {get_all_data, get_all_conjuncts,getFonts,getFontFromParam, getFontsForFamilyPage} = require('./Main/fontSelectedPage/fontSelectedPage')

const fs = require('fs')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const filename = file.originalname;
        const foldername = filename.split('.')[0];
        const folderPath = path.join(__dirname, 'static', 'Fonts', foldername);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }

        cb(null,folderPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ 
    storage: storage,
});
/*----------app usage and set-------------- */

app.use(router)

app.use(express.static(path.join(__dirname,'static')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


app.use(bodyParser.urlencoded({
   extended: true
}));

app.use(bodyParser.json());
app.use(fileUpload());

app.use(function(req,res,next){
    res.send('page does not exist')
})


/*--------------error page thrower */

var throwErrorPage = (res,msg) =>{
    let page = {...pages}
    page.errorPage = true
    let parsingData = {
        page:page,
        msg:msg
    }
    res.render('index',parsingData)
    res.end()
}


/*------------------app routing-------------- */
router.get('/font/:family/:font',(req,res) => {
    let page = {...pages}
    let param = req.params
    let fontData = getFontFromParam(param)
    
    if(fontData){
        font = fontData.font
    }
    else{
        throwErrorPage(res,"There is no Font matching your search")
        return 
    }
    page.fontPage = true

    const syllabary = get_all_data(kannada_syllabary_json_location)

    const all_json_conjuncts = get_all_conjuncts(prefix_name, all_conjuncts)
    

    let parsingData = {
        page:page,
        font:font,
        syllabary:syllabary,
        conjuncts:{
            all_conjuncts:all_conjuncts,
            all_json_conjuncts:all_json_conjuncts,
            conjuncts_in_json:conjuncts_in_json,
            conjuncts_in_page:conjuncts_in_page
        },
        overview:{
            vowels:syllabary.vowels,
            consonants:syllabary.consonants,
            numerals:numerals
        }
    }
    res.render('index', parsingData)
})


router.get('/family/:family',(req,res) => {
    let page = {...pages}

    page.fontFamilyPage = true

    let param = req.params.family
    let fontData = getFontsForFamilyPage(param)
    if(!fontData){
        throwErrorPage(res,"There is no Font matching your search")
        return 
    }    

    let parsingData = {
        page:page,
        data:fontData
    }
    res.render('index', parsingData)
})

router.get('/about', (req, res) => {
    let pag = {...pages}
    pag.aboutPage = true
    let parsingData = {
        page: pag
    }
    res.render('home', parsingData)
})

router.get('/', (req,res) => {
    let pag = {...pages}
    pag.fontShowPage = true
    let parsingData = {
        page:pag
    }
    res.render('home',parsingData)
})


router.get('/getFonts',(req,res) =>{
    const val = req.query.val
    const page = req.query.page
    let fonts = getFonts(val, page)
    res.send(fonts)
})

router.get('/getSuggestionForm', (req, res) => {
    let pag={...pages}
    pag.fontSuggestionPage=true
    res.render('fontSuggestionPage');
});

router.post('/submit-suggestion', upload.single('fontfile'), (req, res) => {
    res.redirect('/');
});

/*--------------app running--------------- */


app.listen(port, () => {
  console.log('server running at port ',port)
})
