const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function(req, res) {
  res.status(200).json("application started");
});

module.exports = router;
