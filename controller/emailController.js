const sendEmailService = require("../services/emailServices.js");

// post send email
const sendemail = async (req, res) => {
    try {
        console.log("du lieu post email ", req.body);
        const { email } = JSON.parse(Object.keys(req.body)[0]);

        if (email) {
            const response = await sendEmailService(email);
            return res.json(response);
        }

        return res.json({
            status: "err",
            message: "email is required",
        });
    } catch (e) {
        console.log("loi ", e);
        return res.json("loi post send email");
    }
};

module.exports = {
    sendemail,
};
