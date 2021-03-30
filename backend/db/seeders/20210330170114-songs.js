'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Songs', [
    { title:"Interstellar Main Theme",
      artist:"Hans Zimmerman",
      album:"Interstellar",
      year:"2014",
      numListens:43,
      filePath: "frontend/public/songs/Interstellar - Main Theme - Hans Zimmer.mp3",
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { title:"Levitating",
      artist:"Dua Lipa",
      album:"Pandemic",
      year:"2020",
      numListens:56,
      filePath: "frontend/public/songs/yt1s.com - Dua Lipa  Levitating Official Lyrics Video.mp3",
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Songs', null, {});
  }
};
