const multer = require("multer");
const appRoot = require("app-root-path");
const path = require("path")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("Đây là app-root-path", appRoot.path);
        cb(null, appRoot.path+"/public/img_product");
    },
    filename: function (req, file, cb) {
      console.log("file upload",file)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null,   uniqueSuffix + '-' + file.originalname  );
    }
});

const upload = multer({ storage: storage });
module.exports = upload;
