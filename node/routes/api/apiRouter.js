const express = require("express");

const loginRouter = require("./login");
// const usersRouter = require("./users");
const timelineRouter = require("./timeline");
// const messageRouter = require("./message");
// const chatroomRouter = require("./chatroom");

const app = express();

app.use("/", loginRouter);
// app.use("/users", usersRouter);
app.use("/timelines", timelineRouter);
// app.use("/messages", messageRouter);
// app.use("/chatroom", chatroomRouter);

module.exports = app;
