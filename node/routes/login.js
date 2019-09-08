const express = require("express");
const passport = require("passport");
const router = express.Router();

const User = require("../schema/User");

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.post("/signin", (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password
  });
  newUser.save(err => {
    if (err) throw err;
    return res.redirect("/");
  });
});

router.get("/login", (req, res) => {
  return res.render("login");
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  User.findOne({ _id: req.session.passport.user }, (err, user) => {
    if (err || !req.session) return res.redirect("/login");

    req.session.user = {
      username: user.username
    };
    return res.redirect("/");
  });
});

module.exports = router;
