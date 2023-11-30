const mysql = require("mysql2/promise")


const poolUser = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodejsbasic'
  });
  

module.exports = poolUser

// connection.execute(
//     'SELECT * FROM `datausers` ',
//     function(err, results, fields) {
//       console.log(results.length); 
  
//     })