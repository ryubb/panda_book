const express = require("express");
const router = express.Router();
const verifyToken = require("../../services/verify");
const jwt = require("jsonwebtoken");

const db = require("../../models/index");

// メッセージ一覧取得
router.get("/:room_id", verifyToken, (req, res) => {
  db.message
    .findRoom(req.params.room_id)
    .then(messages => res.status(200).json(messages));
});

router.post("/:room_id", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "pandabook");
  const data = {
    roomId: req.params.room_id,
    userId: decoded.user.id,
    content: req.body.content
  };

  db.message
    .createMessage(data)
    .then(message => res.status(200).json(message))
    .catch(err => res.status(200).json(err));
});

module.exports = router;
