const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");
const usersRouter = require("./routes/users");
const sakeRouter = require("./routes/sake");
const timelineRouter = require("./routes/timeline");
const apiRouter = require("./routes/api/apiRouter");

const User = require("./schema/User");

const app = express();

mongoose.connect("mongodb://localhost:27017/chatapp", err => {
  if (err) {
    console.log(err);
  } else {
    // ここにMockユーザーを入れれそう
    console.log("successfully connected to MongoDB.");
  }
});

// CORSを許可する
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: "hoge" }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/timelines", timelineRouter);
// リレーションのサンプルあり
app.use("/sake", sakeRouter);
app.use("/api", apiRouter);

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ name: username }, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }

      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password." });
      }
      console.log(`ログインユーザー${user.name}`);
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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
