const config = require('../config');
const mysql = require('mysql2');

let connection = mysql.createConnection(config.db);

connection.connect((err) => {
  if (err) {
    return console.log(err);
  } else {
    console.log('mysql connect is successfully');
  }
});

module.exports = connection;
