'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments', [
      {text: "Love it! Such a nice track!", userId: 2, songId: 1},
      {text: "Can't stop grooving to it!!!", userId: 2, songId: 2},
      {text: "This takes me back to 2014", userId: 3, songId: 1},
      {text: "Am I in the 80s?", userId: 3, songId: 2},
      {text: "Zimmerman is the god. Challenge me", userId: 4, songId: 1},
      {text: "I wouldn't mind walking and swaying my hips through Costco aisles to this", userId: 4, songId: 2},
      {text: "I tripped on this soundtrack while at Joshua tree", userId: 5, songId: 1},
      {text: "My friend Kramer has better beats", userId: 5, songId: 2},
      {text: "Anyone else get turned on when the keys kick in?", userId: 6, songId: 1},
      {text: "I think she has a promising voice. Coarse yet carnal in essence", userId: 6, songId: 2},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
