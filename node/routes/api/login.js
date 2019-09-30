const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

const db = require("../../models/index");

router.post("/signup", (req, res) => {
  const hashed_password = bcrypt.hashSync(req.body.password, 10);
  let data = Object.assign({}, req.body);
  data = Object.assign(data, { hashed_password });

  db.user
    .createUser(data)
    .then(createdUser => {
      // ログイン処理
      jwtSign(createdUser, res);
    })
    .catch(err => res.status(500).json(err));
});

router.post("/login", (req, res) => {
  db.user.getOneByEmail(req.body.email).then(user => {
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
    jwtSign(user, res);
  });
});

const jwtSign = (user, res) => {
  jwt.sign({ user }, "pandabook", { expiresIn: 10000 }, (err, token) => {
    if (err) {
      console.log("fail to create token");
      return res.status(500).json({ message: "tokenの生成に失敗しました" });
    }
    if (token) {
      console.log("login success!");
      return res.status(200).json({ token: token });
    }
  });
};

module.exports = router;
