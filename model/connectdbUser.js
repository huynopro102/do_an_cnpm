const mysql = require("mysql2/promise")


const poolUser = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodejsbasic'
  });
  

module.exports = poolUser

