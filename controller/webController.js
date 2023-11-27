const getHome = (req,res) =>{
    res.render("Home.ejs")
}
const getLogin = (req,res) =>{
    res.render("Login.ejs")
}
const getRegister = (req,res) =>{
    res.render("Register.ejs")
}
const getForgotFassword = (req,res)=>{
    res.render("ForgotFassword.ejs")
}
module.exports = {
    getHome , getLogin ,getRegister , getForgotFassword
}