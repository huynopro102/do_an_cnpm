// get the client
const mysql = require('mysql2/promise');

// create the connection to database
 const pool = mysql.createPool({
  host: 'sql12.freesqldatabase.com',
  user: 'sql12675906',
  password: 'T5fy6qljea',
  database: 'sql12675906'
});


module.exports = pool