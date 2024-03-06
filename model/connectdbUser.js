const mysql = require("mysql2/promise")


const poolUser = mysql.createPool({
  host: 'sql6.freesqldatabase.com',
  user: 'sql6689032',
  password: 'CMqP28Gtr9',
  database: 'sql6689032'
  });
  

module.exports = poolUser

