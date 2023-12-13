const express = require('express')
const app = express()
const path = require("path")
const configeFileStatic = require("../confige/staticFile")
const configeViewEngine = require("../confige/viewEngine")
const initEmail = require("../router/email")
const initWebRouter = require("../router/web")
const initApiRouter = require("../router/api")
const cookieParser = require('cookie-parser');

// Middleware parse body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie-parser
app.use(cookieParser());

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

// init api
app.use("/api/v1",initApiRouter)

app.use("/",initEmail)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})