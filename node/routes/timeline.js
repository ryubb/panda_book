const express = require("express");
const router = express.Router();
const verifyToken = require("../services/verify");

const User = require("../schema/User");
const Timeline = require("../schema/Timeline");

router.get("/", verifyToken, function(req, res, next) {
  Timeline.find({})
    .populate("user")
    .exec((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

router.post("/post", function(req, res, next) {
  User.findOne({}, (err, result) => {
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
