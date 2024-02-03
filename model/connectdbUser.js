const mysql = require("mysql2/promise")


const poolUser = mysql.createPool({
  host: 'sql6.freesqldatabase.com',
  user: 'sql6681696',
  password: 'NNd6V4AiAT',
  database: 'sql6681696'
  });
  

module.exports = poolUser

