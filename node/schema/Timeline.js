const mongoose = require("mongoose");

const Timeline = mongoose.Schema({
  content: String,
  user: { type: Object, ref: "User" },
  date: { type: Date, default: new Date() }
});

module.exports = mongoose.model("Timeline", Timeline);
