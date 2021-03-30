'use strict';
module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('Genre', {
    name: DataTypes.STRING
  }, {});
  Genre.associate = function(models) {
    Genre.hasMany(models.Song, {foreignKey: "genreId"});
  };
  return Genre;
};
