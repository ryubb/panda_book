"use strict";

const mock_rooms = [
  { created_at: new Date(), updated_at: new Date() },
  { created_at: new Date(), updated_at: new Date() },
  { created_at: new Date(), updated_at: new Date() }
];

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert("rooms", mock_rooms, {});
  }
};
