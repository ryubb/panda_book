const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
const verifyToken = require("../services/verify");

const User = require("../schema/User");

router.get("/signin", verifyToken, (req, res) => {
  return res.render("signin");
});

router.post("/signin", (req, res) => {
  const newUser = new User({
    name: req.body.name,
    password: req.body.password
  });
  newUser.save(err => {
    if (err) throw err;
    return res.redirect("/");
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err || !user) {
      return res.status(500).json({ message: "存在しないメールアドレスです" });
    }
    if (user.password !== req.body.password) {
      return res.status(500).json({ message: "パスワードが間違ってます" });
    }
    jwt.sign({ user }, "pandabook", { expiresIn: 60 }, (err, token) => {
      if (err) {
        return res.status(500).json({ message: "tokenの生成に失敗しました" });
      }
      if (token) {
        return res.status(200).json({ token: token });
      }
    });
  });
});

module.exports = router;
