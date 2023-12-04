const express = require("express")
const router = express.Router()
const webController = require("../controller/webController")
const MiddleWare = require("../MiddleWare/webMiddleWare")

// page admin
router.get("/admin/v1", MiddleWare.checkadmin , webController.gethomeController)
router.get("/admin/v1/accounts", MiddleWare.checkadmin  ,webController.gethomeControllerAccounts)
router.get("/admin/v1/accountscreate", MiddleWare.checkadmin  ,webController.gethomeControllerAccountsCreate)
router.get("/admin/v1/accountdelete/:id/:username",MiddleWare.checkadmin, webController.getDeteleAdmin)

// get post , home
router.get("/",webController.getHome)
router.post("/",webController.postHome)

// get , post login
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