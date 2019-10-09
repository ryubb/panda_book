"use strict";
module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define(
    "message",
    {
      room_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      content: DataTypes.STRING
    },
    {
      underscored: true
    }
  );
  message.associate = models => {
    message.belongsTo(models.room);
    message.belongsTo(models.user);
  };

  message.findRoom = roomId => {
    return message.findAll({ where: { room_id: roomId } });
  };

  message.createMessage = data => {
    return message.create({
      room_id: data.roomId,
      user_id: data.userId,
      content: data.content
    });
  };

  return message;
};
