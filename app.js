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

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/", (req, res, next) => {
  Message.find({}, (err, msgs) => {
    if (err) throw err;
    return res.status(200).json({ msgs });
  });
});

app.get("/update", (req, res, next) => {
  return res.render("update");
});

app.post("/update", (req, res, next) => {
  const newMessage = new Message({
    username: req.body.username,
    message: req.body.message
  });
  console.log(newMessage);
  debugger;

  newMessage.save(err => {
    if (err) throw err;
    return res.redirect("/");
  });
});

const server = http.createServer(app);
server.listen("5000");
