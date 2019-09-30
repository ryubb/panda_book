"use strict";

const mock_timelines = [
  {
    user_id: 1,
    content: "タイムライン11",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 1,
    content: "タイムライン12",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 1,
    content: "タイムライン13",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 1,
    content: "タイムライン14",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 1,
    content: "タイムライン15",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 2,
    content: "タイムライン21",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 2,
    content: "タイムライン22",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 3,
    content: "タイムライン31",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 4,
    content: "タイムライン41",
    created_at: new Date(),
    updated_at: new Date()
  }
];

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert("Timelines", mock_timelines, {});
  }
};
