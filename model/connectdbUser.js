const mysql = require("mysql2/promise")


const poolUser = mysql.createPool({
   port : '3306',
   host: 'huynguyen-nginx.io.vn',
  user: 'huynguyen',
  password: '12345678',
  database: 'nodejsbasic'
  });
  

module.exports = poolUser

