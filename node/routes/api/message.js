const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const verifyToken = require("../../services/verify");

const ChatRoom = require("../../schema/ChatRoom");
const Message = require("../../schema/Message");

// メッセージ一覧取得
router.get("/:room_id", (req, res) => {
  Message.find({ chat_room: req.params }, (err, messages) => {
    if (err) throw new Error(err);
    console.log(messages);
    return res.status(200).json(messages);
  });
});

router.post("/:room_id", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "pandabook");

  const newMessage = new Message({
    from_user: decoded.user._id,
    chat_room: req.params,
    content: req.body.content
  });

  newMessage.save(err => {
    if (err) throw new Error(err);
    return res.status(200).json(newMessage);
  });
});

module.exports = router;
