const express = require("express");
const router = express.Router();

const User = require("../schema/User");

/* GET home page. */
router.get("/", function(req, res, next) {
  User.find({}, (err, result) => {
    if (err) throw err;
    const loginUser = req.session && req.session.user;

    res.render("index", { users: result, loginUser });
  });
});

module.exports = router;
