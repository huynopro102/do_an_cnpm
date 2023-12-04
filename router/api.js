const express = require("express")

const apiController = require("../controller/apiController")
const MiddleWare = require("../MiddleWare/webMiddleWare")

const  router = express.Router()

        // router.get("/users",MiddleWare.checkadmin ,apiController.getAllusers)

        // router.get("/user/:id",MiddleWare.checkadmin,apiController.getOneUser)

        // router.post("/create-user",MiddleWare.checkadmin,apiController.CreateUser)

        // router.put("/update-user/:id",MiddleWare.checkadmin,apiController.UpdateUser)

        // router.delete("/delete-user/:id",MiddleWare.checkadmin,apiController.DeleteUser)
    
        router.get("/users",MiddleWare.checkadmin ,apiController.getAllusers)

        router.get("/user/:id",MiddleWare.checkadmin ,apiController.getOneUser)

        router.post("/create-user",MiddleWare.checkadmin ,apiController.CreateUser)

        router.put("/update-user/:id",MiddleWare.checkadmin ,apiController.UpdateUser)

        router.get("/delete-user/:id",MiddleWare.checkadmin ,apiController.DeleteUser)

        //     CÁCH CỦ CHUỐI 
        


    
module.exports = router