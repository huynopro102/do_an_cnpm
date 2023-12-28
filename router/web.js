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

// products
router.get("/admin/v1/product", MiddleWare.checkadmin  ,webController.gethomeControllerProduct)
router.get("/admin/v1/productscreate", MiddleWare.checkadmin , webController.gethomeControllerProductsCreate)
router.get("/admin/v1/productsedit/:id" , MiddleWare.checkadmin ,webController.getProductsEditAdmin)
router.get("/admin/v1/productsdelete/:id" , MiddleWare.checkadmin , webController.getProductsDeleteAdmin)

// order 
router.get("/admin/v1/order", MiddleWare.checkadmin , webController.getHomeControllerOrder)
router.get("/admin/v1/order-no-confirm", MiddleWare.checkadmin , webController.getHomeControllerOrderNoCofirm)
router.post("/admin/v1/order-no-confirm", MiddleWare.checkadmin , webController.postHomeControllerOrderNoCofirm)




// get post , home
router.get("/",webController.getHome)
router.post("/",webController.postHome)

//  login
// router.post("/login" /*MiddleWare.checkLogin */,webController.postLogin)
router.get("/login",webController.getLogin)

// register
router.get("/register",webController.getRegister)
// router.post("/register",webController.postRegister)

// forgotFassword
router.get("/forgotpassword",webController.getForgotFassword)
router.get("/forgotpassword/:id",webController.getForgotFasswordID)

// san pham
router.get("/products" , webController.getProducts)
router.get("/productsDetail/:id" , webController.getProductsDetails)

// thong tin ca nhan khi dang nhap
router.get("/profile/:id", webController.getProfile)
router.post("/profile/:id", webController.postProfile)

// gio hang
router.get("/carts/:id", webController.getCarts)
router.post("/carts/:id", webController.PostCarts)

// lien he
router.get("/contact" , webController.getContact)



module.exports = router