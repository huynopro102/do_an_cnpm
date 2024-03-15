const mysql = require("mysql2/promise")


const poolUser = mysql.createPool({
   port : '3306',
   host: '14.225.218.25',
  user: 'huynguyen',
  password: '12345678',
  database: 'nodejsbasic'
  });
  

module.exports = poolUser

