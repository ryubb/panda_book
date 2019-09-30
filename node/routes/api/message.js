const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const verifyToken = require("../../services/verify");

const db = require("../../models/index");

// メッセージ一覧取得
router.get("/:room_id", verifyToken, (req, res) => {
  db.message
    .findRoom(req.params.room_id)
    .then(messages => res.status(200).json(messages));
});

// router.post("/:room_id", (req, res) => {
//   const token = req.headers.authorization.split(" ")[1];
//   const decoded = jwt.verify(token, "pandabook");

//   const newMessage = new Message({
//     from_user: decoded.user._id,
//     chat_room: req.params,
//     content: req.body.content
//   });

//   newMessage.save(err => {
//     if (err) throw new Error(err);
//     return res.status(200).json(newMessage);
//   });
// });

module.exports = router;
