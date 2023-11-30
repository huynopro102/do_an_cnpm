const express = require("express")
const router = express.Router()
const webController = require("../controller/webController")
const MiddleWare = require("../MiddleWare/webMiddleWare")

// page admin

router.get("/admin/v1",webController.gethomeController)


// get post , home
router.get("/",webController.getHome)
router.post("/",webController.postHome)

// login
router.post("/login", MiddleWare.checkLogin ,webController.postLogin)
router.get("/login",webController.getLogin)

// register
router.get("/register",webController.getRegister)
router.post("/register",webController.postRegister)

// forgotFassword
router.get("/forgotpassword",webController.getForgotFassword)

// san pham
router.get("/products" ,webController.getProducts)



module.exports = router