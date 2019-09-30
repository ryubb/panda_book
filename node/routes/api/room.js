const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const verifyToken = require("../../services/verify");

const db = require("../../models/index");

// チャットルーム作成 登録しようとしているユーザーがroom_idに既に登録してあるなら、500?を返す
router.get("/:to_user_id", verifyToken, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "pandabook");

  let data = {
    from_user_id: decoded.user.id,
    to_user_id: Number(req.params.to_user_id)
  };

  db.room_participant
    .findRoom(data)
    .then(rooms => {
      // roomIdの取得をもっとうまくやりたい
      const resultRooms = Object.assign({}, rooms[0][0]);
      if (Object.keys(resultRooms).length > 0) {
        return res.status(200).json(resultRooms);
      } else {
        // roomIdを取得できながった場合、新しくroomを作成する 別件だが、こういう処理はresourceHandlerでやりたい
        db.room
          .createRoom()
          .then(room => {
            data.room_id = room.id;
            db.room_participant
              .createRooms(data)
              .then(() => res.status(200).json(data))
              .catch(err => res.status(500).json(err));
          })
          .catch(err => res.status(500).json(err));
      }
    })
    .catch(err => res.status(500).json(err));
});

// router.post("/:to_user_id", verifyToken, (req, res) => {
//   const token = req.headers.authorization.split(" ")[1];
//   const decoded = jwt.verify(token, "pandabook");
//   // ChatRoom.find({})

//   const roomId = 1;
//   const newChatRoom1 = new ChatRoom({
//     room_id: roomId,
//     user: decoded.user._id
//   });
//   const newChatRoom2 = new ChatRoom({
//     room_id: roomId,
//     user: req.params.to_user_id
//   });

//   newChatRoom1.save(err => {
//     if (err) throw new Error(err);

//     newChatRoom2.save(err => {
//       if (err) throw new Error(err);
//       return res.status(200).json(roomId);
//     });
//   });
// });

module.exports = router;
