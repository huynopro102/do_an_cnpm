// get the client
const mysql = require('mysql2/promise');

// create the connection to database
 const pool = mysql.createPool({
  host: 'sql6.freesqldatabase.com',
  user: 'sql6683327',
  password: '1xCXAsIWST',
  database: 'sql6683327'
});


module.exports = pool
