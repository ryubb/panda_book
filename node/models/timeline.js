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
  timeline.associate = models => {
    timeline.belongsTo(models.user);
  };

  timeline.getAll = models => {
    return timeline.findAll({
      include: [
        {
          model: models.user,
          required: false
        }
      ]
    });
  };

  timeline.createTimeline = data => {
    return timeline.create({ user_id: data.userId, content: data.content });
  };

  return timeline;
};
