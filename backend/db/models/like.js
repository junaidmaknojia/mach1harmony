'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    userId: DataTypes.INTEGER,
    songId: DataTypes.INTEGER
  }, {});
  Like.associate = function(models) {
    Like.belongsTo(models.Song, {foreignKey: "songId"})
    Like.belongsTo(models.User, {foreignKey: "userId"});
  };
  return Like;
};
