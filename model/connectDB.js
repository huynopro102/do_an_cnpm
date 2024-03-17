// get the client
const mysql = require('mysql2/promise');

// create the connection to database
 const pool = mysql.createPool({
 port: "3306",
  host: "huynguyen-nginx.io.vn",
  user: "huynguyen1",
  password: "123",
  database: "nodejsbasic",
});


module.exports = pool
