const mongoose = require("mongoose");

const ChatRoom = mongoose.Schema({
  room_id: Number,
  user: { type: Object, ref: "User" },
  date: { type: Date, default: new Date() }
});

module.exports = mongoose.model("ChatRoom", ChatRoom);
