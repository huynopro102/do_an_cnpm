const mysql = require("mysql2/promise")


const poolUser = mysql.createPool({
  host: 'sql6.freesqldatabase.com',
  user: 'sql6683327',
  password: '1xCXAsIWST',
  database: 'sql6683327'
  });
  

module.exports = poolUser

