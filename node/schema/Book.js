const mongoose = require("mongoose");

const Book = mongoose.Schema({
  title: String,
  author: String,
  lender: String, // 今はStringにしているが、今後はリレーションの関係上、number等にする可能性もあり。
  borrower: String, // 上記同様
  summay: String,
  genre: String,
  created_date: { type: Date, default: new Date() }
});

module.exports = mongoose.model("Book", Book);
