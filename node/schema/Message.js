const mongoose = require("mongoose");

const Message = mongoose.Schema({
  from_user: { type: Object, ref: "User" },
  chat_room: { type: Object, ref: "ChatRoom" },
  content: String,
  date: { type: Date, default: new Date() }
});

module.exports = mongoose.model("Message", Message);
