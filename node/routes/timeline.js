const express = require("express");
const router = express.Router();

const User = require("../schema/User");
const Timeline = require("../schema/Timeline");

router.get("/", function(req, res, next) {
  Timeline.find({})
    .populate("user_id")
    .exec((err, result) => {
      if (err) throw err;
      res.render("timelines", { timelines: result });
    });
});

router.post("/post", function(req, res, next) {
  // const loginUser = req.session && req.session.user;
  User.findOne({}, (err, result) => {
    if (err) throw err;
    console.log(result);
    const timeline = new Timeline({
      content: req.body.content,
      user_id: result._id
    });

    timeline.save(err => {
      if (err) throw err;
      console.log(timeline);
      res.redirect("/timelines");
    });
  });
});

module.exports = router;
