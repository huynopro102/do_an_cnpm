// get the client
const mysql = require('mysql2/promise');

// create the connection to database
 const pool = mysql.createPool({
  host: 'sql6.freesqldatabase.com',
  user: 'sql6689032',
  password: 'CMqP28Gtr9',
  database: 'sql6689032'
});


module.exports = pool
