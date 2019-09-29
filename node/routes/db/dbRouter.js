const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../schema/User");
const mysql = require("mysql");
const dbConfig = require("../../db/config");

const users = [
  { name: "test1", email: "test1@example.com", password: "Test1234" },
  { name: "test2", email: "test2@example.com", password: "Test1234" },
  { name: "test3", email: "test3@example.com", password: "Test1234" },
  { name: "test4", email: "test4@example.com", password: "Test1234" },
  { name: "test5", email: "test5@example.com", password: "Test1234" },
  { name: "test6", email: "test6@example.com", password: "Test1234" },
  { name: "test7", email: "test7@example.com", password: "Test1234" },
  { name: "test8", email: "test8@example.com", password: "Test1234" },
  { name: "test9", email: "test9@example.com", password: "Test1234" }
];

router.get("/mysql_test", (req, res) => {
  const connection = mysql.createConnection({
    ...dbConfig
  });
  connection.query(
    "insert into users values('mysql_test', 'mysql_test@example.com', 'Test1234');"
  );
  res.status(200).json("success");
});

router.get("/user", (req, res) => {
  users.forEach(user => {
    const hashed_password = bcrypt.hashSync(user.password, 10);
    const newUser = new User({
      name: user.name,
      email: user.email,
      hashed_password: hashed_password
    });
    newUser.save(err => {
      if (err) throw err;
    });
  });
  return res.status(200).json("success");
});

module.exports = router;
