'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Genres', [
      {name: "Pop", createdAt: new Date(), updatedAt: new Date()},
      {name: "Metal", createdAt: new Date(), updatedAt: new Date()},
      {name: "Alternative Rock", createdAt: new Date(), updatedAt: new Date()},
      {name: "Country", createdAt: new Date(), updatedAt: new Date()},
      {name: "Jazz", createdAt: new Date(), updatedAt: new Date()},
      {name: "Electronic Pop", createdAt: new Date(), updatedAt: new Date()},
      {name: "Hip Hop", createdAt: new Date(), updatedAt: new Date()},
      {name: "Blues", createdAt: new Date(), updatedAt: new Date()},
      {name: "Classical", createdAt: new Date(), updatedAt: new Date()},
      {name: "EDM", createdAt: new Date(), updatedAt: new Date()},
      {name: "Punk", createdAt: new Date(), updatedAt: new Date()},
      {name: "Disco", createdAt: new Date(), updatedAt: new Date()},
      {name: "Instrumental", createdAt: new Date(), updatedAt: new Date()},
      {name: "Indie Rock", createdAt: new Date(), updatedAt: new Date()},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Genres', null, {});
  }
};
