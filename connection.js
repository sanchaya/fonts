
// npm install bookshelf knex sqlite

const knexConfig = require('./db/knexfile');
const knex = require('knex')(knexConfig[process.env.NODE_ENV]);
const bookshelf = require('bookshelf')(knex);


const createContributedFontsTable = async () => {
    try {
        await knex.schema.hasTable('contributed_fonts').then(exists => {
            if (!exists) {
                return knex.schema.createTable('contributed_fonts', table => {
                    table.increments('id').primary();
                    table.string('font_name').notNullable();
                    table.string('font_style').notNullable();
                    table.text('sample_paragraph').notNullable();
                    table.string('designed_by').notNullable();
                    table.string('font_license').notNullable();
                    table.string('font_url').notNullable();
                    table.string('submitter_name').notNullable();
                    table.string('email').notNullable();
                    table.binary('font_file').notNullable();
                    // table.blob('font_file').notNullable();
                    console.log('Contributed Fonts table created successfully');
                });
            }
        });


    } catch (error) {
        console.error('Error creating contributed fonts table:', error);
    }
};
createContributedFontsTable();
module.exports=bookshelf;