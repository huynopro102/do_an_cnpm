const bcrypt = require("bcrypt");
const pool = require("../model/connectdbUser");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
// getForgotFasswordID

let getForgotFasswordID = async (req, res) => {
  res.render("ForgotFasswordID.ejs");
};

// post HomeControllerOrderNoCofirm
let postHomeControllerOrderNoCofirm = async (req, res) => {
  console.log("id, orderdate ", req.body);

  try {
    // Lấy thông tin đơn hàng
    const [rows, fields] = await pool.execute(
      "SELECT * FROM orders WHERE Order_ID = ?",
      [req.body.data]
    );

    console.log("rows ", rows);

    if (rows.length > 0) {
      const [deleteResult, deleteFields] = await pool.execute(
        "UPDATE orders SET status = 'xác nhận' WHERE Order_ID = ?",
        [req.body.data]
      );

      if (deleteResult.affectedRows > 0) {
        res.status(200).json({
          success: true,
          message: "Đã xác nhận đơn hàng thành công",
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Xác nhận đơn hàng thành công, nhưng xóa không thành công",
        });
      }
    } else {
      res
        .status(404)
        .json({ success: false, message: "Đơn hàng không tồn tại" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi trong quá trình xác nhận và xóa đơn hàng",
    });
  }
};

// getHomeControllerOrder No Cofirm
let getHomeControllerOrderNoCofirm = async (req, res) => {
  // mảng các đơn hàng của id này và đã xác nhận
  let order_array_confirm = [];
  const [rowsss, fieldsss] = await pool.execute(
    " select * from orders where status = ? ",
    ["xác nhận"]
  );
  order_array_confirm = rowsss;
  console.log("array orders confirm ", order_array_confirm);

  // mảng các đơn hàng của id này và chưa xác nhận
  let order_array = [];
  const [rowssss, fieldssss] = await pool.execute(
    " select * from orders where status = ? ",
    ["chưa xác nhận"]
  );
  order_array = rowssss;
  console.log("array orders ", order_array);

  // lặp các phần tử trong order_array và order_array_confirm
  let list_confirm = [];
  let list_no_confirm = [];

  for (const item of order_array) {
    // Tạo câu truy vấn SQL với chuỗi được phân tách bằng dấu phẩy
    const sqlQuery =
      "SELECT `or`.*, ori.* , p.name ,p.image , info.* FROM `orders` `or` JOIN " +
      " `orderitem` `ori` ON `or`.`Order_ID` = `ori`.`OrderID` " +
      " join product p on ori.ProductID = p.id join orderinginformation info on info.OrderID = or.Order_ID " +
      " where or.Order_ID = ? ";
    const [items, itemss] = await pool.execute(sqlQuery, [item.Order_ID]);
    list_no_confirm.push(items);
  }

  for (const item of order_array_confirm) {
    // Tạo câu truy vấn SQL với chuỗi được phân tách bằng dấu phẩy
    const sqlQuery =
      "SELECT `or`.*, ori.* FROM `orders` `or` JOIN `orderitem` `ori` ON `or`.`Order_ID` = `ori`.`OrderID` where or.Order_ID = ? ";
    const [items, itemss] = await pool.execute(sqlQuery, [item.Order_ID]);
    list_confirm.push(items);
  }

  console.log(
    "list_no_confirm , and length  ",
    list_no_confirm.length,
    list_no_confirm
  );
  console.log("list_confirm , and length  ", list_confirm.length, list_confirm);

  res.render("no_confirm_orderAdmin.ejs", {
    dataProduct: list_no_confirm,
  });
};

// order
let getHomeControllerOrder = async (req, res) => {
  // mảng các đơn hàng của id này và đã xác nhận
  let order_array_confirm = [];
  const [rowsss, fieldsss] = await pool.execute(
    " select * from orders where status = ? ",
    ["xác nhận"]
  );
  order_array_confirm = rowsss;
  console.log("array orders confirm ", order_array_confirm);

  // lặp các phần tử trong order_array và order_array_confirm
  let list_confirm = [];

  for (const item of order_array_confirm) {
    // Tạo câu truy vấn SQL với chuỗi được phân tách bằng dấu phẩy
    const sqlQuery =
      "SELECT `or`.*, ori.* , p.name ,p.image , info.* FROM `orders` `or` JOIN " +
      " `orderitem` `ori` ON `or`.`Order_ID` = `ori`.`OrderID` " +
      " join product p on ori.ProductID = p.id join orderinginformation info on info.OrderID = or.Order_ID  " +
      " where or.Order_ID = ? ";
    const [items, itemss] = await pool.execute(sqlQuery, [item.Order_ID]);
    list_confirm.push(items);
  }

  console.log("list_confirm , and length  ", list_confirm.length, list_confirm);

  res.render("ordersAdmin.ejs", {
    dataProduct: list_confirm,
  });
};

// PostCarts
let PostCarts = async (req, res) => {
  console.log("web post carts ", req.body);

  const [email, email1] = await pool.execute(
    "select * from datausers where id = ?",
    [req.body.UserID]
  );

  const Order = {
    userID: req.body.UserID,
    totalAmount: req.body.totalAmount,
    OrderDate: req.body.OrderDate,
    status: req.body.status,
  };
  const ordering_information = {
    CustomerName: req.body.username,
    CustomerEmail: email[0].email,
    CustomerAddress: req.body.address,
    CustomerPhone: req.body.numberphone,
  };

  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    console.log("bang order ", Order);
    // Thực hiện insert vào bảng orders
    const [orderResult] = await connection.execute(
      "INSERT INTO orders (UserID, totalAmount, OrderDate, status) VALUES (?, ?, ?, ?)",
      [Order.userID, Order.totalAmount, Order.OrderDate, Order.status]
    );

    // đây là  câu lênh lấy trường id khi mới tạo bảng orders
    const orderID = orderResult.insertId;
    const orderItems = Object.values(req.body.giohang);

    // Thêm dữ liệu vào bảng orderinginformation
    await connection.execute(
      "INSERT INTO orderinginformation (OrderID, CustomerName, CustomerEmail, CustomerAddress, CustomerPhone) VALUES (?, ?, ?, ?, ?)",
      [
        orderID,
        ordering_information.CustomerName,
        ordering_information.CustomerEmail,
        ordering_information.CustomerAddress,
        ordering_information.CustomerPhone,
      ]
    );

    // Thêm dữ liệu vào bảng orderItem
    for (const item of orderItems) {
      console.log("item ", item);
      await connection.execute(
        "INSERT INTO orderitem (OrderID, ProductID, Quantity, PricePerUnit, TotalPrice) VALUES (?, ?, ?, ?, ?)",
        [
          orderID,
          item.ProductID,
          item.soluongsp,
          item.gia,
          item.gia * item.soluongsp,
        ]
      );
    }

    // Commit transaction
    await connection.commit();

    res.status(200).json({ success: true, message: "Ghi dữ liệu thành công" });
  } catch (error) {
    // Rollback transaction nếu có lỗi
    await connection.rollback();

    console.error("Lỗi khi ghi dữ liệu:", error.message);
    res.status(500).json({ success: false, message: "Lỗi khi ghi dữ liệu" });
  } finally {
    // Đóng kết nối
    await connection.release();
  }
};

// getContact
let getContact = async (req, res) => {
  if (req.cookies.tokenUser == undefined) {
    return res.render("contact.ejs", { data: "", id: "" });
  }
  if (req.cookies.tokenUser) {
    const result = jwt.verify(req.cookies.tokenUser, "matkhau123");
    const id = result.split("/");
    console.log("mang thong tin ", id);
    const [rows, fields] = await pool.execute(
      " select * from datausers where id = ?",
      [id[0]]
    );
    console.log("data lay ddc ", rows[0]);
    return res.render("contact.ejs", {
      data: rows[0].username,
      id: rows[0].id,
    });
  }
};

//  getCarts

let getCarts = async (req, res) => {
  try {
    let data = "";
    let id = req.params.id;

    if (id == undefined) {
      return res.render("cart.ejs", {
        data: "",
      });
    } else {
      const [rows, fields] = await pool.execute(
        " select * from datausers where id = ? ",
        [id]
      );

      if (rows.length !== 0) {
        res.render("carts.ejs", {
          data: rows[0].username,
          id: id == undefined ? "0" : id,
        });
      } else {
        res.render("carts.ejs", {
          data: "",
          id: id == undefined ? "0" : id,
        });
      }
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
};





// post Profile
let postProfile = async (req, res) => {
  console.log(req.body);

  try {
    const [rows, fields] = await pool.execute(
      "SELECT * FROM datausers WHERE id = ?",
      [req.body.id]
    );

    if (rows.length > 0) {
      const passwordMatch = await new Promise((resolve, reject) => {
        bcrypt.compare(
          req.body.old_password,
          rows[0].password,
          function (err, result) {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });

      if (passwordMatch) {
        let hash_password = "";
        let id = req.body.id;

        await bcrypt.hash(
          req.body.confirmPassword,
          saltRounds,
          function (err, hash) {
            if (err) {
              console.error("Lỗi khi hash mật khẩu mới:", err);
              res.status(500).json("Internal Server Error");
              return;
            }
            hash_password = hash;
            pool.execute(
              "UPDATE datausers SET password = ? WHERE id = ?",
              [hash_password, id] 
              )
            console.log("hash ", hash);
          }
        );


        console.log("Password matches!");
        res.status(200).json("oke");
      } else {
        console.log("Incorrect old password.");
        res.status(403).json("mat khau cu sai");
      }
    } else {
      console.log("User not found.");
      res.status(404).json("not found user");
    }
  } catch (error) {
    console.error("Lỗi trong quá trình xử lý:", error);
    res.status(500).json("Internal Server Error");
  }
};




//  getProfile
let getProfile = async (req, res) => {
  console.log(req.params);
  const token = req.cookies.tokenUser;
  if (token) {
    // lấy id
    const result = jwt.verify(token, "matkhau123");
    const id = result.split("/");
    console.log("mang thong tin ", id);
    const [rows, fields] = await pool.execute(
      " select * from datausers where id = ?",
      [id[0]]
    );
    console.log("data lay ddc ", rows[0]);

    // mảng các đơn hàng của id này và đã xác nhận
    let order_array_confirm = [];
    const [rowsss, fieldsss] = await pool.execute(
      " select * from orders where UserID = ? and status = ? ",
      [id[0], "xác nhận"]
    );
    order_array_confirm = rowsss;
    console.log("array orders confirm ", order_array_confirm);

    // mảng các đơn hàng của id này và chưa xác nhận
    let order_array = [];
    const [rowssss, fieldssss] = await pool.execute(
      " select * from orders where UserID = ? and status = ? ",
      [id[0], "chưa xác nhận"]
    );
    order_array = rowssss;
    console.log("array orders ", order_array);

    // lặp các phần tử trong order_array và order_array_confirm
    let list_confirm = [];
    let list_no_confirm = [];

    for (const item of order_array) {
      // Tạo câu truy vấn SQL với chuỗi được phân tách bằng dấu phẩy
      const sqlQuery =
        "SELECT `or`.*, ori.* , p.* , info.* FROM `orders` `or` JOIN `orderitem` `ori` ON `or`.`Order_ID` = `ori`.`OrderID` join product p on p.id = ori.ProductID join orderinginformation info on info.OrderID = ori.OrderID where or.Order_ID = ? ";
      const [items, itemss] = await pool.execute(sqlQuery, [item.Order_ID]);
      list_no_confirm.push(items);
    }

    for (const item of order_array_confirm) {
      // Tạo câu truy vấn SQL với chuỗi được phân tách bằng dấu phẩy
      const sqlQuery =
        "SELECT `or`.*, ori.* , p.* , info.* FROM `orders` `or` JOIN `orderitem` `ori` ON `or`.`Order_ID` = `ori`.`OrderID` join product p on p.id = ori.ProductID join orderinginformation info on info.OrderID = ori.OrderID  where or.Order_ID = ? ";
      const [items, itemss] = await pool.execute(sqlQuery, [item.Order_ID]);
      list_confirm.push(items);
    }

    console.log(
      "list_no_confirm , and length  ",
      list_no_confirm.length,
      list_no_confirm
    );
    console.log(
      "list_confirm , and length  ",
      list_confirm.length,
      list_confirm
    );

    // lấy lịch sử đặt hàng , hoặc chờ xác nhận
    const [rowss, fieldss] = await pool.execute(
      " select * from orders where UserID = ?",
      [id[0]]
    );

    // chưa mua hàng
    if (rowss == undefined) {
      return res.render("profile.ejs", {
        data: rows[0].username,
        id: rows[0].id,
        item_list_confirm: [],
        item_list_no_confirm: [],
      });
    } else {
      // đã mua hàng
      return res.render("profile.ejs", {
        data: rows[0].username,
        id: rows[0].id,
        item_list_confirm: list_confirm,
        item_list_no_confirm: list_no_confirm,
      });
    }
  }
  return res.render("err500.ejs");
};

// gethomeControllerCategory

let gethomeControllerCategory = async (req, res) => {
  let _page = req.query.page ? req.query.page : 1;
  let limit = 5;
  let start = (_page - 1) * limit;
  // let totalRow = 20;
  let name = req.query.name;

  // total tổng các item trong database
  const [total, fields] = await pool.execute(
    "select count(*) as total from category"
  );
  let totalRow = total[0].total;

  // tong so trang
  let totalPage = Math.ceil(totalRow / limit);

  //
  if (name) {
    const [rows, fields] = await pool.execute(
      "SELECT * FROM `category` where `name` like ? limit ? , ? ",
      [`%${name}%`, start, limit]
    );
    res.render("CategoryAdmin.ejs", {
      dataUser: rows ? rows : [],
      totalPage: totalPage,
      page: parseInt(_page),
    });
  } else {
    const [rows, fields] = await pool.execute(
      "SELECT * FROM `category` limit ? , ? ",
      [start, limit]
    );
    res.render("CategoryAdmin.ejs", {
      dataUser: rows ? rows : [],
      totalPage: totalPage,
      page: parseInt(_page),
    });
  }
};

// edit admin accounts
let getAccountsEditAdmin = async (req, res) => {
  const itemId = req.params.id;
  const [rows, fields] = await pool.execute(
    "SELECT * FROM `datausers` where id = ? ",
    [itemId]
  );

  res.render("AccountsAdmin-edit.ejs", {
    row: rows,
  });
};

//getCategorysEditAdmin
let getCategorysEditAdmin = async (req, res) => {
  const itemId = req.params.id;
  const [rows, fields] = await pool.execute(
    "SELECT * FROM `category` where id = ? ",
    [itemId]
  );
  console.log("id", rows[0] == undefined);
  if (rows[0] == undefined) return res.json("loi server");
  res.render("CategoryAdmin-edit.ejs", {
    row: rows,
  });
};

// get home admin
let gethomeController = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM `datausers`");
  // await pool.execute( 'SELECT * FROM `users`') sẽ trả về 1 mảng các phần tử trong db , 2 là trả về fields
  res.render("HomeAdmin.ejs", { dataUser: rows });
};

let gethomeControllerAccounts = async (req, res) => {
  let _page = req.query.page ? req.query.page : 1;
  let limit = 5;
  let start = (_page - 1) * limit;
  // let totalRow = 20;
  let name = req.query.name;

  // total tổng các item trong database
  const [total, fields] = await pool.execute(
    "select count(*) as total from datausers"
  );
  let totalRow = total[0].total;

  // tong so trang
  let totalPage = Math.ceil(totalRow / limit);

  //
  if (name) {
    const [rows, fields] = await pool.execute(
      "SELECT * FROM `datausers` where `username` like ? limit ? , ? ",
      [`%${name}%`, start, limit]
    );
    res.render("AccountsAdmin.ejs", {
      dataUser: rows ? rows : [],
      totalPage: totalPage,
      page: parseInt(_page),
    });
  } else {
    const [rows, fields] = await pool.execute(
      "SELECT * FROM `datausers` limit ? , ? ",
      [start, limit]
    );
    res.render("AccountsAdmin.ejs", {
      dataUser: rows ? rows : [],
      totalPage: totalPage,
      page: parseInt(_page),
    });
  }
};

let gethomeControllerAccountsCreate = async (req, res) => {
  res.render("AccountsAdmin-create.ejs");
};

// delete page admin
let getDeteleAdmin = async (req, res) => {
  const id = req.params.id;
  const username = req.params.username;
  console.log(id);
  const [rows, fields] = await pool.execute(
    "SELECT * FROM `datausers` where id = ? and username = ? ",
    [id, username]
  );
  if (username && id && rows[0].id) {
    const user = await pool.execute("delete from datausers where id = ?", [id]);
    res.redirect("/admin/v1/accounts");
  } else {
    res.json("loi server");
  }
};

// post home
let postHome = async (req, res) => {
  const [sp, fieldsss] = await pool.execute(" select * from product ");
  console.log("list sp ", sp);

  // Define list_sp in both scenarios
  const list_sp = sp === undefined ? [] : sp;
  console.log("post home da login");

  res.clearCookie("tokenUser");

  res.render("Home.ejs", {
    data: "",
    id: "12313",
    list_sp: list_sp,
    localStorage123: [],
  });
};

let getHomeAdmin = async (req, res) => {
  console.log("post homeAdmin ");
  res.clearCookie("tokenAdmin");
  res.redirect("/");
};
// get home
const getHome = async (req, res) => {
  console.log("co kkee ", req.cookies);

  try {
    const [sp, fieldsss] = await pool.execute(" select * from product ");
    console.log("list sp ", sp);

    // Define list_sp in both scenarios
    const list_sp = sp === undefined ? [] : sp;

    if (req.cookies.tokenUser == undefined) {
      return res.render("Home.ejs", { data: "", id: "", list_sp: list_sp });
    }
    if (req.cookies.tokenUser) {
      const result = jwt.verify(req.cookies.tokenUser, "matkhau123");
      const id = result.split("/");
      console.log("mang thong tin ", id);
      const [rows, fields] = await pool.execute(
        " select * from datausers where id = ?",
        [id[0]]
      );
      console.log("data lay ddc ", rows[0]);
      return res.render("Home.ejs", {
        data: rows[0].username,
        id: rows[0].id,
        list_sp: list_sp,
      });
    }
  } catch (error) {
    console.error("Error in getHome:", error);

    return res
      .status(500)
      .render("error.ejs", { errorMessage: "Internal Server Error" });
  }
};
const getLogin = (req, res) => {
  res.render("Login.ejs");
};
const getRegister = (req, res) => {
  res.render("Register.ejs");
};

// post dang ky
const postRegister = async (req, res) => {
  const username = req.body.UserName;
  const password = req.body.PassWord;
  const confirmpassword = req.body.ConfirmPassWord;
  const email = req.body.Email;
  // check comfirm password
  if (password !== confirmpassword) {
    res.json("nhap dung mat khau");
  } else {
    const [rows, fields] = await pool.execute(
      "INSERT INTO datausers(username,password,email,admin) VALUES(?,?,?,?)",
      [username, password, email, 0]
    );
    console.log("dang ky thanh cong post ");
    res.render("NoLoginHome.ejs");
  }
  res.json("loi post register");
};

const getForgotFassword = (req, res) => {
  console.log("get forgot password");
  return res.render("ForgotFassword.ejs");
};

// router get product detail
// router get product detail
const getProductsDetails = async (req, res) => {
  try {
    const id = req.params.id;
    let data = "";
    let user = "";
    const token = req.cookies.tokenUser;
    if (token) {
      const result = jwt.verify(token, "matkhau123");
      console.log("token ", result);
      const id = result.split("/");
      console.log("mang thong tin ", id);
      console.log("mang thong tin 2", id[1]);
      const [rows1, fields] = await pool.execute(
        " select * from datausers where id = ? and admin = ? ",
        [id[0], id[1]]
      );
      data = rows1[0].username;
      console.log("user ", data);
    }
    const [rows, fields] = await pool.execute(
      "select * from product where id = ? ",
      [id]
    );
    user = rows[0];

    res.render("ProductDetail.ejs", {
      data: data,
      user: user,
    });
  } catch (error) {
    console.error("Error in getProductsDetails:", error);
    return res.render("err500.ejs");
  }
};

// router get products

const getProducts = async (req, res) => {
  let _page = req.query.page ? req.query.page : 1;
  let limit = 9;
  let start = (_page - 1) * limit;

  // tong so san pham trong san pham
  const [total, fieldss] = await pool.execute(
    "SELECT count(*) as total FROM product WHERE status = 1"
  );
  const totalElements = total[0].total;

  // tong so trang
  let totalPage = Math.ceil(totalElements / limit);

  let data = "";
  try {
    let data2 = "";

    const token = req.cookies.tokenUser;
    if (token) {
      const result = jwt.verify(token, "matkhau123");
      console.log("token ", result);
      const id = result.split("/");
      console.log("mang thong tin ", id);
      console.log("mang thong tin 2", id[1]);
      const [rows1, fields] = await pool.execute(
        " select * from datausers where id = ? and admin = ? ",
        [id[0], id[1]]
      );
      data = rows1[0].username;
      data2 = rows1[0].id;
      console.log("user ", data);
    } else {
    }

    const [rows, fields] = await pool.execute(
      "SELECT * FROM product WHERE status = 1 LIMIT ?, ?",
      [start, limit]
    );

    res.render("Products.ejs", {
      image: rows || [],
      totalPage: totalPage,
      page: parseInt(_page),
      data: data.length == 0 ? "" : data,
      id: data2 != undefined ? data2 : "",
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
};

// post login
const postLogin = async (req, res) => {
  const username = req.body.UserName;
  const password = req.body.Password;

  if (!username || !password) {
    // Handle the case where username or password is missing
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }
  const [rows, fields] = await pool.execute(
    "SELECT * FROM `datausers` where username = ? and password = ?",
    [username, password]
  );

  console.log(rows[0]);
  if (rows.length === 0) {
    return res.status(505).json({ error: "User not found" });
  } else {
    console.log("rows vo kiem tra admin user");

    if (rows[0].admin === 0) {
      const token = jwt.sign(rows[0].id + "/" + rows[0].admin, "matkhau123");
      res.cookie(`token`, token);
      return res.redirect("/");
    } else if (rows[0].admin === 1) {
      // Handle the case for admin === 1
      const tokenAdmin = jwt.sign(rows[0].id, "matkhau1234");
      res.cookie("tokenAdmin", tokenAdmin);
      return res.redirect("/admin/v1");
    }
  }
};

// product

let gethomeControllerProduct = async (req, res) => {
  try {
    let _page = req.query.page ? req.query.page : 1;
    let limit = 5;
    let start = (_page - 1) * limit;
    // let totalRow = 20;
    let name = req.query.name;

    // total tổng các item trong database
    const [total, fields] = await pool.execute(
      "select count(*) as total from product"
    );
    let totalRow = total[0].total;

    // tong so trang
    let totalPage = Math.ceil(totalRow / limit);

    if (name) {
      const [rows, fields] = await pool.execute(
        "SELECT * FROM `product` p JOIN category c ON p.category_id = c.id WHERE p.`name` LIKE ? LIMIT ? , ?",
        [`%${name}%`, start, limit]
      );

      res.render("ProductsAdmin.ejs", {
        dataProduct: rows ? rows : [],
        totalPage: totalPage,
        page: parseInt(_page),
      });
    } else {
      const [rows, fields] = await pool.execute(
        "SELECT p.*, c.name as cname FROM `product` p JOIN category c ON p.category_id = c.id LIMIT ? , ?",
        [start, limit]
      );
      res.render("ProductsAdmin.ejs", {
        dataProduct: rows ? rows : [],
        totalPage: totalPage,
        page: parseInt(_page),
      });
    }
  } catch (error) {
    console.error("Error in gethomeControllerProduct:", error);
    res.render("err500.ejs");
  }
};

let gethomeControllerProductsCreate = async (req, res) => {
  // lay danh muc

  const [rows, fields] = await pool.execute("SELECT * FROM `category`");
  if (rows.length <= 0) {
    res.render("ProductsAdmin-create.ejs", {
      data: [],
    });
  } else {
    res.render("ProductsAdmin-create.ejs", {
      data: rows,
    });
  }
};

// delete product
let getProductsDeleteAdmin = async (req, res) => {
  console.log("delete product ", req.params.id);
  const id = req.params.id;

  if (id) {
    try {
      // Kiểm tra xem sản phẩm có tồn tại không
      const [rows, fields] = await pool.execute(
        "SELECT * FROM product WHERE id = ?",
        [id]
      );

      if (rows.length > 0) {
        // Nếu sản phẩm tồn tại, thực hiện câu lệnh DELETE
        await pool.execute("DELETE FROM product WHERE id = ?", [id]);

        res.redirect("/admin/v1/product"); // Chuyển hướng sau khi xóa thành công
      } else {
        res.render("err500.ejs"); // Xử lý trường hợp sản phẩm không tồn tại
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      res.render("err500.ejs"); // Xử lý lỗi nếu có
    }
  } else {
    res.render("err500.ejs"); // Xử lý trường hợp không có id
  }
};

// get product edit admin
let getProductsEditAdmin = async (req, res) => {
  const productId = req.params.id;
  const [productRows, productFields] = await pool.execute(
    "SELECT * FROM product WHERE id = ?",
    [productId]
  );

  const [categoryRows, categoryFields] = await pool.execute(
    "SELECT * FROM `category`"
  );

  if (productRows.length > 0) {
    res.render("ProductsAdmin-edit.ejs", {
      productData: productRows[0],
      categoryData: categoryRows,
    });
  } else {
    // Handle case when product is not found
    res.redirect("/admin/v1/product");
  }
};

module.exports = {
  getHome,
  getLogin,
  getRegister,
  getForgotFassword,
  getProducts,
  getProductsDetails,
  postLogin,
  postRegister,
  postHome,
  gethomeController,
  gethomeControllerAccounts,
  gethomeControllerAccountsCreate,
  getDeteleAdmin,
  getHomeAdmin,
  getAccountsEditAdmin,

  gethomeControllerCategory,
  getCategorysEditAdmin,

  gethomeControllerProduct,
  gethomeControllerProductsCreate,
  getProductsEditAdmin,
  getProductsDeleteAdmin,

  getProfile,
  getCarts,
  getContact,
  PostCarts,

  getHomeControllerOrder,
  getForgotFasswordID,
  getHomeControllerOrderNoCofirm,
  postHomeControllerOrderNoCofirm,
  postProfile,
};
