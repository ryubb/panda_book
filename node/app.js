"user strict";
const http = require("http");
const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

const User = require("./schema/User");
const Book = require("./schema/Book");
const Message = require("./schema/Message");

const app = express();

mongoose.connect("mongodb://localhost:27017/chatapp", err => {
  if (err) {
    console.log(err);
  } else {
    // ここにMockユーザーを入れれそう
    const newUser = new User({
      username: "ryubb",
      password: "ryubb"
    });
    newUser.save(err => {
      if (err) throw err;
    });
    console.log("successfully connected to MongoDB.");
  }
});

app.use(bodyparser());

app.use(session({ secret: "HogeFuga" }));
app.use(passport.initialize());
app.use(passport.session());

// pugの設定
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  User.find({}, (err, users) => {
    if (err) throw err;
    return res.render("index", {
      users: users,
      loginUser: req.session && req.session.user ? req.session.user : null
    });
  });
});

app.get("/messages", (req, res) => {
  Message.find({}, (err, msgs) => {
    if (err) throw err;
    return res.status(200).json({ msgs });
  });
});

app.get("/signin", (req, res) => {
  return res.render("signin");
});

app.post("/signin", (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password
  });
  newUser.save(err => {
    if (err) throw err;
    return res.redirect("/");
  });
});

app.get("/login", (req, res) => {
  return res.render("login");
});

app.post("/login", passport.authenticate("local"), (req, res) => {
  User.findOne({ _id: req.session.passport.user }, (err, user) => {
    if (err || !req.session) return res.redirect("/login");

    req.session.user = {
      username: user.username
    };
    return res.redirect("/");
  });
});

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      console.log("passport");
      console.log(user);
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }

      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findOne({ _id: id }, (err, user) => {
    done(err, user);
  });
});

// 本の一覧API
app.get("/books", (req, res) => {
  Message.find({}, (err, msgs) => {
    if (err) throw err;
    return res.status(200).json({ msgs });
  });
});

app.post("/post_book", (req, res) => {
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
