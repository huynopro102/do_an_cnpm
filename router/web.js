const express = require("express")
const router = express.Router()
const webController = require("../controller/webController")

router.get("/",webController.getHome)
router.get("/login",webController.getLogin)
router.get("/register",webController.getRegister)
router.get("/forgotpassword",webController.getForgotFassword)

module.exports = router