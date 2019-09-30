"use strict";

const mock_rooms_participant = [
  { room_id: 1, user_id: 1, created_at: new Date(), updated_at: new Date() },
  { room_id: 1, user_id: 2, created_at: new Date(), updated_at: new Date() },
  { room_id: 2, user_id: 1, created_at: new Date(), updated_at: new Date() },
  { room_id: 2, user_id: 3, created_at: new Date(), updated_at: new Date() },
  { room_id: 3, user_id: 2, created_at: new Date(), updated_at: new Date() },
  { room_id: 3, user_id: 3, created_at: new Date(), updated_at: new Date() }
];

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      "room_participants",
      mock_rooms_participant,
      {}
    );
  }
};
