const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const verifyToken = require("../../services/verify");

const db = require("../../models/index");

router.get("/", verifyToken, function(req, res) {
  db.timeline
    .findAll({
      include: [
        {
          model: db.user,
          required: false
        }
      ]
    })
    .then(timelines => res.status(200).json(timelines));
});

router.post("/post", verifyToken, function(req, res) {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "pandabook");

  db.user.findOne({ where: { id: decoded.user.id } }).then(user => {
    if (!user) {
      res.status(500).json("ログイン情報とDBが一致しません");
    }

    db.timeline
      .create({
        user_id: user.id,
        content: req.body.content
      })
      .then(createdTimeline => res.status(200).json(createdTimeline));
  });
});

module.exports = router;
