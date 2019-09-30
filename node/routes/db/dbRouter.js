const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../../models/index"); // cliでinitした時に作成されるmodels配下のindex.js
router.get("/mysql_test", (req, res) => {
  // findAll
  db.user.findAll({}).then(instances => {
    // usersのところが自分で作成したモデル
    console.log(instances); // usersの中身を全て取得した結果
  });

  console.log("以下create user");

  // create
  db.user
    .create({
      username: "#####",
      email: "#####@#####"
    })
    .then(createdUser => {
      console.log(createdUser); // 作成されたuserインスタンスの詳細
    });
  return res.status(200).json("success");
});

module.exports = router;
