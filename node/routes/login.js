const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

const User = require("../schema/User");

router.post("/signup", (req, res) => {
  const hashed_password = bcrypt.hashSync(req.body.password, 10);
  const newUser = new User({
    email: req.body.email,
    password: hashed_password
  });
  console.log(newUser);
  newUser.save(err => {
    if (err) throw err;
    console.log("signup success!!");
    return res.status(200);
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err || !user) {
      console.log("invalid email");
      return res.status(500).json({ message: "存在しないメールアドレスです" });
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      console.log("invalid password");
      return res.status(500).json({ message: "パスワードが間違ってます" });
    }
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
