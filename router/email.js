const express = require("express")

const emailController = require("../controller/emailController")

const  router = express.Router()

        router.post("/sendemail",emailController.sendemail)    
    
module.exports = router