const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cors = require("cors");
const logger = require("morgan");
const mongoose = require("mongoose");

const indexRouter = require("./routes/index");
const sakeRouter = require("./routes/sake");
const dbRouter = require("./routes/db/dbRouter");
const apiRouter = require("./routes/api/apiRouter");

const app = express();

mongoose.connect("mongodb://localhost:27017/chatapp", err => {
  if (err) {
    console.log(err);
  } else {
    console.log("successfully connected to MongoDB.");
  }
});

// CORSを許可する
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api", apiRouter);
app.use("/db", dbRouter);
app.use("/sake", sakeRouter); // リレーションのサンプルあり

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
