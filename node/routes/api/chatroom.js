const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const verifyToken = require("../../services/verify");

const ChatRoom = require("../../schema/ChatRoom");

// チャットルーム作成 登録しようとしているユーザーがroom_idに既に登録してあるなら、500?を返す
router.get("/:to_user_id", verifyToken, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "pandabook");
  ChatRoom.find({ user: decoded.user })
    .populate("user")
    .exec((err, result) => {
      if (err) throw err;
      res.status(200).json(result);
    });
});

router.post("/:to_user_id", verifyToken, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "pandabook");
  // ChatRoom.find({})

  const roomId = 1;
  const newChatRoom1 = new ChatRoom({
    room_id: roomId,
    user: decoded.user._id
  });
  const newChatRoom2 = new ChatRoom({
    room_id: roomId,
    user: req.params.to_user_id
  });

  newChatRoom1.save(err => {
    if (err) throw new Error(err);

    newChatRoom2.save(err => {
      if (err) throw new Error(err);
      return res.status(200).json(roomId);
    });
  });
});

module.exports = router;
