'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Genres', [
      {name: "Pop"},
      {name: "Metal"},
      {name: "Alternative Rock"},
      {name: "Country"},
      {name: "Jazz"},
      {name: "Electronic Pop"},
      {name: "Hip Hop"},
      {name: "Blues"},
      {name: "Classical"},
      {name: "EDM"},
      {name: "Punk"},
      {name: "Disco"},
      {name: "Instrumental"},
      {name: "Indie Rock"},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Genres', null, {});
  }
};
