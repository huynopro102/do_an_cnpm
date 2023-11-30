require("dotenv").config()
const nodemailer = require("nodemailer");
const sendEmailService = async (email) =>{
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    const info = await transporter.sendMail({
        from: '"Mã Quên Mật Khẩu" <sodienthoai1230123@gmail.com>', // sender address
        to: email , // list of receivers
        subject: "send email api", // Subject line
        text: `Mã Đổi Mật Khẩu ${"fjdkae32"}`, // plain text body
        html: "<b>Mã Đổi Mật Khẩu</b>", // html body
      });
      return info
}

module.exports = sendEmailService