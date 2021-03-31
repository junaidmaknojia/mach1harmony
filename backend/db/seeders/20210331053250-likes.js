'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Likes', [
      {userId: 2, songId: 1},
      {userId: 2, songId: 2},
      {userId: 3, songId: 1},
      {userId: 3, songId: 2},
      {userId: 4, songId: 1},
      {userId: 4, songId: 2},
      {userId: 5, songId: 1},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Likes', null, {});
  }
};
