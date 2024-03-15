// get the client
const mysql = require('mysql2/promise');

// create the connection to database
 const pool = mysql.createPool({
  host: '14.225.218.25',
  user: 'huynguyen',
  password: '12345678',
  database: 'nodejsbasic'
});


module.exports = pool
