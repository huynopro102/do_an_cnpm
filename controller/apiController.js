const pool = require("../model/connectDB")

let getAllusers = async (req, res) => {
    console.log("get all")
    const [rows, fields] = await pool.execute('SELECT * FROM `datausers`')
    res.status(200).json({
        message: "eric",
        data: rows
    })
}
let getOneUser = async (req, res) => {

    const idUser = req.params.id
    const [rows, fields] = await pool.execute('SELECT * FROM `datausers` WHERE id = ?', [idUser])

    const result = rows.length === 0 ? "id không tồn tại , err client" : rows

    console.log(result)
    res.status(200).json({
        data: result
    })
}


let CreateUser = async (req, res) => {
    let username = req.body.UserName
    let password = req.body.PassWord
    let confirmpassword = req.body.ConfirmPassWord
    let email = req.body.Email

    console.log("create user")
    if(password !== confirmpassword){
        return res.json("nhap dung mat khau")
    }

    if (!username || !confirmpassword || !password || !email) {
        console.log(firstName, lastName, email, address)
        return res.status(200).json("không để trống các trường dữ liệu")
    }
    const [rows, fields] = await pool.execute('INSERT INTO users(username,password,email) VALUES(?,?,?)'

        , [username,password,email])
    res.status(200).json("tạo thành công ")
}


let UpdateUser = async (req, res) => {
    let firstName = req.body.firstname
    let lastName = req.body.lastname
    let email = req.body.email
    let address = req.body.address

    const idUser = req.params.id
    const [users, fields] = await pool.execute('SELECT * FROM `users` WHERE id = ?', [idUser])

    if (users.length === 0) {
        return res.status(200).json("id không tồn tại , err client")
    }

    if (!firstName || !lastName || !email || !address) {
        console.log(firstName, lastName, email, address)
        return res.status(200).json("không để trống các trường dữ liệu")
    }

    const user = await pool.execute("UPDATE users SET firstName = ? , lastName = ? , email = ? , address = ? WHERE id = ?", [firstName, lastName, email, address, idUser])
    res.status(200).json("update thành công ")
}

let DeleteUser = async (req, res) => {
    const idUser = req.params.id
    const [users, fields] = await pool.execute("select * from users where id = ?", [idUser])
    console.log(users.length)
    if (users.length === 0) {
       return res.status(200).json("id không tồn tại , err client")
    }

    if (users[0].id.toString().trim() === idUser.trim()) {
        const user = await pool.execute('delete from users where id = ?', [idUser])
        res.status(200).json("delete thành công ")
    }
}

module.exports  = {
    getOneUser , getAllusers , CreateUser , UpdateUser ,DeleteUser
}