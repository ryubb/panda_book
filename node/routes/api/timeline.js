const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const verifyToken = require("../../services/verify");

const db = require("../../models/index");

router.get("/", verifyToken, function(req, res) {
  db.timeline
    .getAll(db)
    .then(timelines => res.status(200).json(timelines))
    .catch(err => res.status(500).json(err));
});

router.post("/post", verifyToken, function(req, res) {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "pandabook");

  db.user
    .getOneById(decoded.user.id)
    .then(user => {
      if (!user) {
        res.status(500).json("ログイン情報とDBが一致しません");
      }

      const data = { userId: user.id, content: req.body.content };

      db.timeline
        .create(data)
        .then(createdTimeline => res.status(200).json(createdTimeline))
        .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
