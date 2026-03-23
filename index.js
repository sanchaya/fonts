const express = require('express')
const multer = require('multer');
const fileUpload = require('express-fileupload');
const contributedFolder = require('./contributedFolder');



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

const session = require('express-session')

const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'fontsadmin123'

app.use(session({
    secret: 'fonts-secret-key-2024',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}))

const {get_all_data, get_all_conjuncts,getFonts,getFontFromParam, getFontsForFamilyPage} = require('./Main/fontSelectedPage/fontSelectedPage')

const fs = require('fs')

const METADATA_FILE = path.join(__dirname, 'fontMetadata.json')

const loadMetadata = () => {
    try {
        return JSON.parse(fs.readFileSync(METADATA_FILE, 'utf8'))
    } catch {
        return {}
    }
}

const saveMetadata = (data) => {
    fs.writeFileSync(METADATA_FILE, JSON.stringify(data, null, 2))
}

const requireAdmin = (req, res, next) => {
    if (req.session && req.session.isAdmin) {
        return next()
    }
    res.redirect('/login')
}

const requireLogin = (req, res, next) => {
    if (req.session && req.session.isAdmin) {
        return res.redirect('/admin')
    }
    next()
}

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


app.use(express.json());
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
    
    const metadata = loadMetadata()
    const fontMetadata = metadata[param.family] || { author: 'Not Available', license: 'Unknown', source: '', foundry: '', description: '' }

    let parsingData = {
        page:page,
        font:font,
        fontFamily: param.family,
        fontMetadata: fontMetadata,
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
    res.render('fontSuggestionPage', { page: pag });
});

router.post('/submit-suggestion', upload.single('fontfile'), (req, res) => {
    const fontData = req.body;

    contributedFolder.insertContributedFont(fontData, (err, lastInsertedId) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to submit font suggestion.' });
        }
        res.redirect('/');
    });
    
});

/*------------------admin routes-------------- */
router.get('/login', requireLogin, (req, res) => {
    res.render('login')
})

router.post('/login', (req, res) => {
    const { username, password } = req.body
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        req.session.isAdmin = true
        res.redirect('/admin')
    } else {
        res.render('login', { error: 'Invalid credentials' })
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

router.get('/admin', requireAdmin, (req, res) => {
    const fonts = require('./fonts.json')
    const metadata = loadMetadata()
    res.render('admin', { fonts, metadata })
})

router.get('/admin/font/:family', requireAdmin, (req, res) => {
    const fonts = require('./fonts.json')
    const metadata = loadMetadata()
    const family = req.params.family
    const fontData = fonts[family]
    const fontMeta = metadata[family] || { author: '', license: '', source: '', foundry: '', description: '' }
    res.render('adminEdit', { family, fontData, fontMeta })
})

router.post('/admin/font/:family', requireAdmin, (req, res) => {
    const { author, license, source, foundry, description } = req.body
    const metadata = loadMetadata()
    metadata[req.params.family] = { author, license, source, foundry, description }
    saveMetadata(metadata)
    res.redirect('/admin')
})

router.get('/export', (req, res) => {
    const fonts = require('./fonts.json')
    const metadata = loadMetadata()
    
    const exportData = {}
    for (const [family, data] of Object.entries(fonts)) {
        exportData[family] = {
            ...data,
            metadata: metadata[family] || { author: 'Not Available', license: 'Unknown', source: 'Unknown', foundry: 'Unknown', description: '' }
        }
    }
    
    res.header('Content-Type', 'application/json')
    res.attachment('fonts-export.json')
    res.send(JSON.stringify(exportData, null, 2))
})

/*--------------app running--------------- */


app.listen(port, () => {
  console.log('server running at port ',port)
})
