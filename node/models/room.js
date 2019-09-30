"use strict";

module.exports = sequelize => {
  const room = sequelize.define(
    "room",
    {},
    {
      underscored: true
    }
  );
  room.associate = models => {
    room.hasMany(models.room_participant, { foreignKey: "room_id" });
    room.hasMany(models.message, { foreignKey: "room_id" });
  };

  room.createRoom = () => {
    return room.create({});
  };

  return room;
};
