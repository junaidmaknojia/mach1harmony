'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    title: DataTypes.STRING,
    artist: DataTypes.STRING,
    album: DataTypes.STRING,
    year: DataTypes.STRING,
    numListens: DataTypes.INTEGER,
    filePath: DataTypes.STRING,
    coverPhoto: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    genreId: DataTypes.INTEGER
  }, {});
  Song.associate = function(models) {
    Song.belongsTo(models.User, {foreignKey: "userId"});
    Song.hasMany(models.Comment, {
      foreignKey: "songId",
      onDelete: "CASCADE",
      hooks: true
    });
    Song.hasMany(models.Like, {foreignKey: "songId"});
    Song.belongsTo(models.Genre, {foreignKey: "genreId"});
  };
  return Song;
};
