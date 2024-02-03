// get the client
const mysql = require('mysql2/promise');

// create the connection to database
 const pool = mysql.createPool({
  host: 'sql6.freesqldatabase.com',
  user: 'sql6681696',
  password: 'NNd6V4AiAT',
  database: 'sql6681696'
});


module.exports = pool