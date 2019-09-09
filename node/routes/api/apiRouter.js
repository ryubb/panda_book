const express = require("express");
const router = express.Router();

const User = require("../../schema/User");

/* GET home page. */
router.get("/users", function(req, res, next) {
  User.find({}, (err, result) => {
    if (err) throw err;

    console.log(result);
    res.json(result);
  });
});

module.exports = router;
