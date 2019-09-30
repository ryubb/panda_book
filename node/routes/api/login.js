const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

const db = require("../../models/index");

router.post("/signup", (req, res) => {
  const hashed_password = bcrypt.hashSync(req.body.password, 10);
  db.user
    .create({
      name: req.body.name,
      email: req.body.email,
      hashed_password: hashed_password
    })
    .then(createdUser => {
      console.log(createdUser); // 作成されたuserインスタンスの詳細
      return res.status(200).json(createdUser);
    });
});

router.post("/login", (req, res) => {
  db.user.findOne({ where: { email: req.body.email } }).then(user => {
    // 入力したemailのユーザーの存在性チェック
    if (!user) {
      console.log("invalid email");
      return res.status(500).json({ message: "存在しないメールアドレスです" });
    }

    // 入力したpasswordがあっているかチェック
    if (!bcrypt.compareSync(req.body.password, user.hashed_password)) {
      console.log("invalid password");
      return res.status(500).json({ message: "パスワードが間違ってます" });
    }

    // ログイン処理
    jwt.sign({ user }, "pandabook", { expiresIn: 1000 }, (err, token) => {
      if (err) {
        console.log("fail to create token");
        return res.status(500).json({ message: "tokenの生成に失敗しました" });
      }
      if (token) {
        console.log("login success!");
        return res.status(200).json({ token: token });
      }
    });
  });
});

module.exports = router;
