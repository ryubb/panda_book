const express = require("express");
const router = express.Router();

const User = require("../../schema/User");

/* GET users listing. */
router.get("/get", (req, res) => {
  User.find({}, (err, users) => {
    if (err) throw new Error(err);
    console.log(users);
    res.status(200).json(users);
  });
});

module.exports = router;
