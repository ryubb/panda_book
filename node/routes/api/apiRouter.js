const express = require("express");

const loginRouter = require("./login");
const userRouter = require("./user");
const timelineRouter = require("./timeline");
const messageRouter = require("./message");
const roomRouter = require("./room");

const app = express();

app.use("/", loginRouter);
app.use("/users", userRouter);
app.use("/timelines", timelineRouter);
app.use("/messages", messageRouter);
app.use("/rooms", roomRouter);

module.exports = app;
