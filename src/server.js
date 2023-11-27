const express = require('express')
const app = express()
const path = require("path")
const configeFileStatic = require("../confige/staticFile")
const configeViewEngine = require("../confige/viewEngine")
const initWebRouter = require("../router/web")
// dotenv
require("dotenv").config()
const port = process.env.PORT || 4001
// stati file
configeFileStatic(app,path,__dirname)
console.log("__dirname",__dirname+"\\public")
// view engine
configeViewEngine(app,path,__dirname)

// init web router
app.use("/",initWebRouter)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})