const express = require("express");
const router = express.Router();
const verifyToken = require("../../services/verify");

const db = require("../../models/index");
// const User = require("../../resourceHandler/userResourceHandler");

router.get("/get", verifyToken, (req, res) => {
  db.user
    .getAll()
    .then(test => res.status(200).json(test))
    .catch(err => res.status.json(err));
});

module.exports = router;
