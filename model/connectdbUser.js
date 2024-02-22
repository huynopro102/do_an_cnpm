const mysql = require("mysql2/promise")


const poolUser = mysql.createPool({
  host: 'sql6.freesqldatabase.com',
  user: 'sql6686020',
  password: 'Xr4jmddHuM',
  database: 'sql6686020'
  });
  

module.exports = poolUser

