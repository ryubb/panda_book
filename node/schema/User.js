const mongoose = require("mongoose");

const User = mongoose.Schema({
  name: String,
  email: String,
  hashed_password: String,
  date: { type: Date, default: new Date() }
});

module.exports = mongoose.model("User", User);
