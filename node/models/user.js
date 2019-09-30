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
  user.associate = function(models) {
    // associations can be defined here
    console.log(models);
  };
  return user;
};
