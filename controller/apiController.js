const pool = require("../model/connectDB");
const jwt = require("jsonwebtoken");
const sendEmailService = require("../services/emailServices");
const bcrypt = require("bcrypt");
const saltRounds = 10;


// getSignOutAdmin

let getSignOutAdmin = async (req, res) => {
  try {
    // Clear the "cookieAdmin" cookie
    res.clearCookie("tokenAdmin");

    // Redirect or respond as needed
    // For example, redirect to the home page
    res.redirect("/");
  } catch (error) {
    console.error("Error during sign out:", error);
    // Handle errors appropriately
    res.status(500).json("Internal Server Error");
  }
}


// forgotpassword ID

let postForgotPasswordID = async (req, res) => {
  console.log(req.body);
  const key_verify_token = req.body.code;
  const new_password = req.body.password;
  const token = req.cookies.token_password;
  jwt.verify(token, key_verify_token, async function (err, decoded) {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(500).json("Token đã hết hạn");
      } else if (err.name === "JsonWebTokenError") {
        return res.status(501).json("Token không hợp lệ");
      } else {
        console.error("Lỗi khác:", err.message);
      }
      // Xử lý lỗi ở đây
    } else {
      let encrypted_password = "";
      console.log(new_password, decoded.email);
      await bcrypt.genSalt(saltRounds, async function (err, salt) {
        await bcrypt.hash(new_password, salt, async function (err, hash) {
          encrypted_password = hash;
          console.log("encrypt password , ", hash);
          const [rows, fields] = await pool.execute(
            "UPDATE datausers SET  password = ? WHERE email = ?",
            [encrypted_password, decoded.email]
          );
        });
      });

      return res.status(200).json("updata thanh cong");
    }
  });
};

// forgot password
let postForgotPassword = async (req, res) => {
  console.log("post forgotpassword ", req.body);
  const email = req.body.email;
  const [email1, fields] = await pool.execute(
    " select * from datausers where email = ?",
    [email]
  );
  console.log(email1);
  if (email1.length == 0) {
    console.log("1");
    return res.status(404).json("khong tim thay");
  } else {
    try {
      function generateRandomString(length) {
        const characters =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let randomString = "";

        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          randomString += characters.charAt(randomIndex);
        }

        return randomString;
      }

      const password = generateRandomString(10);
      const password_token = await jwt.sign({ email }, password, {
        expiresIn: 120,
      });

      console.log("2");
      res.cookie("token_password", password_token);
      // send email
      sendEmailService(email, password);
      return res.status(200).json({ token_password: password_token });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json("Internal Server Error");
    }
  }
};

// post register
let postRegister = async (req, res) => {
  const username = req.body.UserName;
  const password = req.body.Password;
  const email = req.body.email;

  console.log("/api/v1/register ", username, password, email);
  const [rowss, fieldss] = await pool.execute(
    "SELECT * FROM `datausers` WHERE email = ? or username = ?",
    [email, username]
  );

  try {
    console.log("rows ", rowss);

    // kiểm tra email đã có chưa
    if (rowss.length === 0) {
      await bcrypt.genSalt(saltRounds, async function (err, salt) {
        await bcrypt.hash(password, salt, async function (err, hash) {
          encrypted_password = hash;
          console.log("encrypt password , ", hash);
          const [rows, fields] = await pool.execute(
            "INSERT INTO datausers(username,password,email,admin) VALUES(?,?,?,?)",
            [username, encrypted_password, email, 0]
          );
        });
      });

      return res.status(200).json("thanh cong");
    } else {
      return res.status(400).json(" email hoặc tên người dùng này đã tồn tại");
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json("Internal server error");
  }
};

const postLogin = async (req, res) => {
  console.log("api/v1/login, post");
  console.log(req.body.UserName);
  console.log(req.body.Password);

  if (req.body.UserName == "" || req.body.Password == "") {
    return res.status(505).json("Không để rỗng dữ liệu");
  }

  const username = req.body.UserName;
  const password = req.body.Password;

  try {
    const [rows, fields] = await pool.execute(
      "SELECT * FROM `datausers` WHERE email = ?",
      [username]
    );

    if (rows.length === 0) {
      return res.status(505).json("không tìm thấy người dùng");
    }

    console.log("api/v1/login, post 1 ", rows[0]);

    if (rows[0].admin === 0) {
      const result = await bcrypt.compare(password, rows[0].password);

      console.log("result ", result);

      if (result) {
        const token = jwt.sign(rows[0].id + "/" + rows[0].admin, "matkhau123");
        res.cookie(`tokenUser`, token);
        return res.status(200).json("thanh cong");
      } else {
        return res.status(500).json("Lỗi máy chủ nội bộ");
      }
    }

    if (rows[0].admin === 1) {
      const result = await bcrypt.compare(password, rows[0].password);

      if (result) {
        const tokenAdmin = jwt.sign(rows[0].id, "matkhau1234");
        res.cookie("tokenAdmin", tokenAdmin);
        return res.status(201).json("admin");
      } else {
        return res.status(500).json("Lỗi máy chủ nội bộ");
      }
    }
  } catch (error) {
    console.error("Lỗi trong quá trình đăng nhập:", error);
    return res.status(500).json("Lỗi máy chủ nội bộ");
  }
};

let GET_DeleteUser = async (req, res) => {
  res.json("get delete user");
};

let getAllusers = async (req, res) => {
  console.log("get all");
  const [rows, fields] = await pool.execute("SELECT * FROM `datausers`");
  res.status(200).json({
    message: "eric",
    data: rows,
  });
};

let getOneUser = async (req, res) => {
  const idUser = req.params.id;
  const [rows, fields] = await pool.execute(
    "SELECT * FROM `datausers` WHERE id = ?",
    [idUser]
  );

  const result = rows.length === 0 ? "id không tồn tại , err client" : rows;

  console.log(result);
  res.status(200).json({
    data: result,
  });
};

let CreateUser = async (req, res) => {
  let username = req.body.UserName;
  let password = req.body.PassWord;
  let confirmpassword = req.body.ConfirmPassWord;
  let email = req.body.Email;
  let hash_password = ''
  console.log("create user");
  if (password !== confirmpassword) {
    return res.json("không khớp mật khẩu");
  }

  if (!username || !confirmpassword || !password || !email) {
    return res.status(200).json("không để trống các trường dữ liệu");
  }
 await bcrypt.genSalt(saltRounds, function(err, salt) {
     bcrypt.hash(confirmpassword, salt,  function(err, hash) {
        hash_password = hash
    });
});
  const [rows, fields] = await pool.execute(
    "INSERT INTO datausers(username,password,email,admin) VALUES(?,?,?,?)",
    [username, hash_password, email, 0]
  );
  res.status(200).json("tạo thành công ");
};

let UpdateUser = async (req, res) => {
  let username = req.body.UserName;
  let password = req.body.PassWord;
  let email = req.body.Email;

  const idUser = req.params.id;
  const [users, fields] = await pool.execute(
    "SELECT * FROM `datausers` WHERE id = ?",
    [idUser]
  );

  if (users.length === 0) {
    return res.status(200).json("id không tồn tại , err client");
  }

  if (!username || !password || !email || !idUser) {
    console.log("rong du lieu");
    return res.status(200).json("không để trống các trường dữ liệu");
  }
  console.log("updata");
  const user = await pool.execute(
    "UPDATE datausers SET username = ? , email = ? , password = ? WHERE id = ?",
    [username, email, password, idUser]
  );
  res.status(200).json("update thành công ");
};

// category
let UpdateCategory = async (req, res) => {
  let name = req.body.name;
  let radio = req.body.radio;
  const idUser = req.params.id;
  const [users, fields] = await pool.execute(
    "SELECT * FROM `category` WHERE id = ?",
    [idUser]
  );
  if (users.length === 0) {
    return res.status(500).json("id không tồn tại , err client");
  }
  console.log(name, radio);
  if (name.length != 0 && radio.length != 0) {
    console.log("updata category ");
    const user = await pool.execute(
      "UPDATE category SET name = ? , status = ?  WHERE id = ?",
      [name, radio, idUser]
    );
    return res.status(200).json("update thành công ");
  }
  console.log("rong du lieu");
  return res.status(501).json("không để trống các trường dữ liệu");
};

let DeleteUser = async (req, res) => {
  const idUser = req.params.id;
  const [users, fields] = await pool.execute(
    "select * from datausers where id = ?",
    [idUser]
  );
  console.log("delete user ", users);
  if (users.length === 0) {
    return res.status(200).json("id không tồn tại , err client");
  }

  if (users[0].id.toString().trim() === idUser.trim()) {
    const user = await pool.execute("delete from datausers where id = ?", [
      idUser,
    ]);
    res.status(200).json("delete thành công ");
  }
};

//  category

let DeleteCategory = async (req, res) => {
  const idCategory = req.params.id;
  const [users, fields] = await pool.execute(
    "select * from category where id = ?",
    [idCategory]
  );
  console.log("delete category ", users);
  if (users.length === 0) {
    return res.status(200).json("id không tồn tại , err client");
  }

  if (users[0].id.toString().trim() === idCategory.trim()) {
    const user = await pool.execute("delete from category where id = ?", [
      idCategory,
    ]);
    res.status(200).json("delete thành công ");
  }
};

// category
let CreateCategory = async (req, res) => {
  let name = req.body.name;
  let radio = req.body.radio;

  console.log("create category ", name, radio);

  // kiem tra xem da co san pham nay chua
  const [row, field] = await pool.execute(
    "SELECT * FROM `category` WHERE name = ?",
    [name]
  );
  console.log(row[0]);

  if (row[0] == undefined) {
    if (!name) {
      return res.status(200).json("không để trống các trường dữ liệu");
    }
    const [rows, fields] = await pool.execute(
      "INSERT INTO category(name,status) VALUES(?,?)",
      [name, radio]
    );
    res.status(200).json("tạo thành công ");
  } else {
    return res.status(409).json("trung san pham");
  }
};

// Update Product
let UpdateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const databody = req.body;

    // Nếu có file hình ảnh được tải lên
    if (req.file !== undefined) {
      const filePath = req.file.path;
      const lastIndex = filePath.lastIndexOf("\\");
      const cutString =
        lastIndex !== -1 ? filePath.substring(lastIndex + 1) : null;
      databody.image = cutString;
      console.log(databody);
      // Tạo câu lệnh SQL UPDATE
      const updateQuery =
        "UPDATE product SET name = ?, price = ?, sale_price = ?, image = ?, category_id = ?, status = ? WHERE id = ?";

      // Thực hiện câu lệnh SQL UPDATE
      await pool.query(updateQuery, [
        databody.name,
        databody.price,
        databody.sale_price,
        databody.image,
        databody.category,
        databody.status,
        productId,
      ]);
      console.log("co file hinh anh ");
      return res.redirect("/admin/v1/product");
    } else if (req.file == undefined) {
    }

    // Tạo câu lệnh SQL UPDATE
    const updateQuery =
      "UPDATE product SET name = ?, price = ?, sale_price = ?, image = ?, category_id = ?, status = ? WHERE id = ?";

    // Thực hiện câu lệnh SQL UPDATE
    await pool.query(updateQuery, [
      databody.name,
      databody.price,
      databody.sale_price,
      databody.image_old,
      databody.category,
      databody.status,
      productId,
    ]);
    console.log("khong co file hinh anh ");

    // Nếu không có lỗi, trả về kết quả thành công
    res.redirect("/admin/v1/product");
  } catch (error) {
    console.error("Lỗi trong quá trình cập nhật sản phẩm:", error);
    res.render("err500.ejs");
  }
};

//  CreateProduct
let CreateProduct = async (req, res) => {
  try {
    let databody = req.body;
    databody.image = req.file;
    console.log(databody);

    if (
      databody.name == "" ||
      databody.price == "" ||
      databody.sale_price == "" ||
      databody.category == ""
    ) {
      return res.render("empty505.ejs");
    }
    if (!req.file) {
      return res.render("errfile505.ejs");
    }
    const filePath = req.file.path;
    const lastIndex = filePath.lastIndexOf("\\");
    let cutString = null;
    if (lastIndex !== -1) {
      cutString = filePath.substring(lastIndex + 1);
      console.log("day la cutstring ", cutString); // Output: aobaba1.jpg-1702133409552-481773093
    } else {
      console.error('String does not contain "\\" character');
    }

    await pool.query(
      "INSERT INTO product(name, price, sale_price, image, category_id, status) VALUES(?, ?, ?, ?, ?, ?)",
      [
        databody.name,
        databody.price,
        databody.sale_price,
        cutString,
        databody.category,
        databody.status,
      ]
    );

    // Nếu không có lỗi, redirect về trang productscreate
    res.redirect("/admin/v1/product");
  } catch (error) {
    console.error("Error during product creation:", error);
    res.render("err500.ejs");
  }
};

module.exports = {
  getOneUser,
  getAllusers,
  CreateUser,
  UpdateUser,
  DeleteUser,
  GET_DeleteUser,

  CreateCategory,
  DeleteCategory,
  UpdateCategory,

  CreateProduct,
  UpdateProduct,
  postLogin,
  postRegister,
  postForgotPassword,
  postForgotPasswordID,

  getSignOutAdmin

};
