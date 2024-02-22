// get the client
const mysql = require('mysql2/promise');

// create the connection to database
 const pool = mysql.createPool({
  host: 'sql6.freesqldatabase.com',
  user: 'sql6686020',
  password: 'Xr4jmddHuM',
  database: 'sql6686020'
});


module.exports = pool
