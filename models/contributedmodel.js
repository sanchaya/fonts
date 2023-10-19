const bookshelf = require('../connection');

const ContributedFolder = bookshelf.model('ContributedFolder',{
  tableName: 'contributed_fonts', // Specify the table name

  // Optional: Specify the id attribute if your primary key column is not named 'id'
  idAttribute: 'id',

  // Optional: Add relationships, validations, or other model-specific methods here
});

module.exports = ContributedFolder;

