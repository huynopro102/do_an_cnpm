const pool = require("../model/connectdbUser");
const jwt = require("jsonwebtoken");

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


// gethomeControllerCategorysCreate
let gethomeControllerCategorysCreate = async (req,res) =>{
    res.render("CategoryAdmin-create.ejs");
}
module.exports = {

  gethomeControllerCategory ,
  gethomeControllerCategorysCreate
};
