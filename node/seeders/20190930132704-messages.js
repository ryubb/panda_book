"use strict";

const mock_mesages = [
  {
    room_id: 1,
    user_id: 1,
    content: "test1からの送信です１",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    room_id: 1,
    user_id: 1,
    content: "test1からの送信です２",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    room_id: 1,
    user_id: 2,
    content: "test2からの送信です1",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    room_id: 1,
    user_id: 1,
    content: "test1からの送信です１",
    created_at: new Date(),
    updated_at: new Date()
  }
];

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert("messages", mock_mesages, {});
  }
};
