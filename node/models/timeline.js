"use strict";
module.exports = (sequelize, DataTypes) => {
  const timeline = sequelize.define(
    "timeline",
    {
      user_id: DataTypes.INTEGER,
      content: DataTypes.STRING
    },
    {
      underscored: true
    }
  );
  timeline.associate = function(models) {
    // associations can be defined here
  };
  return timeline;
};
