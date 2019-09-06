const http = require("http");
const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

const Message = require("./schema/Message");

const app = express();

mongoose.connect("mongodb://localhost:27017/chatapp", err => {
  if (err) {
    console.log(err);
  } else {
    console.log("successfully connected to MongoDB.");
  }
});

app.use(bodyparser());

app.get("/", (req, res, next) => {
  Message.find({}, (err, msgs) => {
    if (err) throw err;
    return res.status(200).json({ msgs });
  });
});

// 本の一覧API
app.get("/books", (req, res, next) => {
  Message.find({}, (err, msgs) => {
    if (err) throw err;
    return res.status(200).json({ msgs });
  });
});

app.post("/post_book", (req, res, next) => {
  const newBook = new Book({
    title: req.body.title,
    author: req.body.author,
    lender: req.body.lender,
    summay: req.body.lender,
    genre: req.body.genre
  });

  newBook.save(err => {
    if (err) throw err;
    return res.status(200).json({ result: true });
  });
});

const server = http.createServer(app);
server.listen("5000");
