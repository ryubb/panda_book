const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const verifyToken = require("../services/verify");

const User = require("../schema/User");
const Timeline = require("../schema/Timeline");

router.get("/", verifyToken, function(req, res) {
  Timeline.find({})
    .populate("user")
    .exec((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

router.post("/post", verifyToken, function(req, res) {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "pandabook");

  User.findOne({ _id: decoded.user._id }, (err, result) => {
    if (err) throw err;
    const timeline = new Timeline({
      content: req.body.content,
      user: result._id
    });

    timeline.save(err => {
      if (err) throw err;
      Timeline.findOne({ _id: timeline._id })
        .populate("user")
        .exec((err, result) => {
          if (err) throw err;
          console.log(result);
          res.json(result);
        });
    });
  });
});

module.exports = router;
