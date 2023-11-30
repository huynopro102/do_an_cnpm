const express = require("express")

const apiController = require("../controller/apiController")

const  router = express.Router()

        router.get("/users",apiController.getAllusers)

        router.get("/user/:id",apiController.getOneUser)

        router.post("/create-user",apiController.CreateUser)

        router.put("/update-user/:id",apiController.UpdateUser)

        router.delete("/delete-user/:id",apiController.DeleteUser)
    
    
module.exports = router