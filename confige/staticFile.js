const express = require("express")
const configeFileStatic = (app,path,__dirname)=>{
    app.use("/congkhai",express.static(path.join(__dirname,"/public")))
  
}
module.exports = configeFileStatic
