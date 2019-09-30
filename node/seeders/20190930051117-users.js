"use strict";
const bcrypt = require("bcrypt");

const mock_users = [
  {
    name: "test1",
    email: "test1@example.com",
    hashed_password: bcrypt.hashSync("Test1234", 10),
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "test2",
    email: "test2@example.com",
    hashed_password: bcrypt.hashSync("Test1234", 10),
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "test3",
    email: "test3@example.com",
    hashed_password: bcrypt.hashSync("Test1234", 10),
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "test4",
    email: "test4@example.com",
    hashed_password: bcrypt.hashSync("Test1234", 10),
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "test5",
    email: "test5@example.com",
    hashed_password: bcrypt.hashSync("Test1234", 10),
    created_at: new Date(),
    updated_at: new Date()
  }
];

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert("Users", mock_users, {});
  }
};
