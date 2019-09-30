"use strict";
module.exports = (sequelize, DataTypes) => {
  const room_participant = sequelize.define(
    "room_participant",
    {
      user_id: DataTypes.INTEGER,
      room_id: DataTypes.INTEGER
    },
    {
      underscored: true
    }
  );
  room_participant.associate = models => {
    room_participant.belongsTo(models.user);
    room_participant.belongsTo(models.room);
  };

  room_participant.findRoom = data => {
    return sequelize.query(
      `select a_rooms.room_id, a_rooms.user_id as from_user_id, b_rooms.user_id as to_user_id from room_participants as a_rooms join room_participants as b_rooms on a_rooms.room_id = b_rooms.room_id where a_rooms.id != b_rooms.id and a_rooms.user_id = ${data.from_user_id} and b_rooms.user_id = ${data.to_user_id};`
    );
  };

  room_participant.createRooms = data => {
    return room_participant.bulkCreate([
      { user_id: data.from_user_id, room_id: data.room_id },
      { user_id: data.to_user_id, room_id: data.room_id }
    ]);
  };

  return room_participant;
};
