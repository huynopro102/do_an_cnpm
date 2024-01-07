const express = require("express")

const apiController = require("../controller/apiController")
const MiddleWare = require("../MiddleWare/webMiddleWare")
const upload = require("../model/upload-multer")

const  router = express.Router()


        // accounts

        router.get("/users",MiddleWare.checkadmin ,apiController.getAllusers)

        router.get("/user/:id",MiddleWare.checkadmin,apiController.getOneUser)

        router.post("/create-user",MiddleWare.checkadmin , apiController.CreateUser)

        router.put("/update-user/:id",MiddleWare.checkadmin,apiController.UpdateUser)

        router.delete("/delete-user/:id", MiddleWare.checkadmin, apiController.DeleteUser)
    

        //  category
        router.get("/category",MiddleWare.checkadmin ,apiController.getAllusers)

        router.get("/category/:id",MiddleWare.checkadmin,apiController.getOneUser)

        router.post("/create-category",MiddleWare.checkadmin , apiController.CreateCategory)

        router.put("/update-category/:id",MiddleWare.checkadmin,apiController.UpdateCategory)

        router.delete("/delete-category/:id", MiddleWare.checkadmin, apiController.DeleteCategory)


        // product
        router.post("/create-product", MiddleWare.checkadmin , upload.single("image") , apiController.CreateProduct)
        router.post("/update-product/:id" , MiddleWare.checkadmin , upload.single("image") , apiController.UpdateProduct)

        // login , register , forgotPassword
        router.post("/login", apiController.postLogin)
        router.post("/register",apiController.postRegister)
   

        // forgot password
        router.post("/forgotpassword",apiController.postForgotPassword)
        router.post("/forgotpassword/:id",apiController.postForgotPasswordID)

        // sign out admin
        router.get("/admin/v1/signout",apiController.getSignOutAdmin)

      

        

    
module.exports = router