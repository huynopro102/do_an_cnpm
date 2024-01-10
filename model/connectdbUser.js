const mysql = require("mysql2/promise")


const poolUser = mysql.createPool({
  host: 'sql12.freesqldatabase.com',
  user: 'sql12675906',
  password: 'T5fy6qljea',
  database: 'sql12675906'
  });
  

module.exports = poolUser

