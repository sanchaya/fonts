const path = require('path');
const sqlite3 = require('sqlite3').verbose();
// Specify the path to the database file

const dbPath = path.join(__dirname, '.', 'db', 'mydatabase.db');
const db = new sqlite3.Database(dbPath);

exports.insertContributedFont = (fontData, callback) =>{
    const {font_name, font_style, sample_paragraph, designed_by, font_license, font_url, submitter_name, email, fontFile} = fontData;
    const query = `INSERT INTO contributed_folder (font_name, font_style, sample_paragraph, designed_by, font_license, font_url, submitter_name, email, fontFile) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    console.log(font_name);
    db.run(query, [font_name, font_style, sample_paragraph, designed_by, font_license, font_url, submitter_name, email, fontFile], function(err) {
        if (err) {
            console.error('Error inserting data:', err.message);
            callback(err);
        } else {
            console.log(`A new row has been inserted with ID ${this.lastID}`);
            callback(null, this.lastID);
        }
    });



}


