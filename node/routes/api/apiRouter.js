const express = require("express");

const loginRouter = require("./login");
const usersRouter = require("./users");
const timelineRouter = require("./timeline");

const app = express();

app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/timelines", timelineRouter);

module.exports = app;
