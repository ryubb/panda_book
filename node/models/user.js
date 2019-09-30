"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      name: DataTypes.STRING,
      email: DataTypes.INTEGER,
      hashed_password: DataTypes.STRING
    },
    {
      underscored: true
    }
  );
  user.associate = models => {
    user.hasMany(models.timeline, { foreignKey: "user_id" });
    user.hasMany(models.room_participant, { foreignKey: "user_id" });
  };

  user.getAll = () => {
    return user.findAll({});
  };

  user.getOneById = id => {
    return user.findOne({ where: { id: id } });
  };

  user.getOneByEmail = email => {
    return user.findOne({ where: { email: email } });
  };

  user.createUser = data => {
    return user.create({
      name: data.name,
      email: data.email,
      hashed_password: data.hashed_password
    });
  };

  return user;
};
