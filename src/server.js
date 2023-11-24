const express = require('express')
const app = express()
const path = require("path")
const configeFileStatic = require("../confige/staticFile")
const configeViewEngine = require("../confige/viewEngine")
// dotenv
require("dotenv").config()
const port = process.env.PORT || 4001
// stati file
configeFileStatic(app,path,__dirname)
console.log("__dirname",__dirname)
// view engine
configeViewEngine(app,path,__dirname)


const { MongoClient } = require('mongodb');
const { render } = require('ejs')
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = process.env.MONGODB_URL
const client = new MongoClient(url);

// Database Name
const dbName = 'MERN';
const url_img = null
async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('accounts');

  // the following code examples can be pasted here...

  return collection.find({}).toArray();
}

main()
  .then(data =>{
     console.log(data[0])
  })
  .catch(console.error)
  .finally(() => client.close());

app.get("/",(req,res)=>{
    res.render('demo.ejs',{
      titles: ["Title 1", "Title 2", "Title 3"]
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})