const express = require("express")
const router = express.Router()
const webController = require("../controller/webController")
const categoryController = require("../controller/categoryController")
const MiddleWare = require("../MiddleWare/webMiddleWare")

// page admin
router.get("/admin/v1", MiddleWare.checkadmin , webController.gethomeController)

// accounts
router.get("/admin/v1/accounts", MiddleWare.checkadmin  ,webController.gethomeControllerAccounts)
router.get("/admin/v1/accountsedit/:id" ,webController.getAccountsEditAdmin)
router.get("/admin/v1/accountscreate", MiddleWare.checkadmin  ,webController.gethomeControllerAccountsCreate)
router.get("/admin/v1/accountdelete/:id/:username",MiddleWare.checkadmin, webController.getDeteleAdmin)

// categorys
router.get("/admin/v1/category", MiddleWare.checkadmin  ,categoryController.gethomeControllerCategory)
router.get("/admin/v1/categoryscreate", MiddleWare.checkadmin  , categoryController.gethomeControllerCategorysCreate)
router.get("/admin/v1/categorysedit/:id" , MiddleWare.checkadmin ,webController.getCategorysEditAdmin)




// get post , home
router.get("/",webController.getHome)
router.post("/",webController.postHome)

//  login
router.post("/login", MiddleWare.checkLogin ,webController.postLogin)
router.get("/login",webController.getLogin)

// register
router.get("/register",webController.getRegister)
router.post("/register",webController.postRegister)

// forgotFassword
router.get("/forgotpassword",webController.getForgotFassword)

// san pham
router.get("/products" , webController.getProducts)



module.exports = router