module.exports = {
    development:{
        client:'sqlite',
        connection: {
            filename: './mydatabase.db', // Path to your SQLite database file
          },

        migrations:{
            tableName:'knex_migrations',
            directory:'./migrations',
        },
       useNullAsDefault : true
    }
};