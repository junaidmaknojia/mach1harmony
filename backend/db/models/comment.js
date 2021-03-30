'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    text: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    songId: DataTypes.INTEGER
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
  };
  return Comment;
};