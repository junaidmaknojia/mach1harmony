'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Songs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      artist: {
        type: Sequelize.STRING,
        allowNull: false
      },
      album: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      numListens: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      filePath: {
        allowNull: false,
        type: Sequelize.STRING
      },
      coverPhoto: {
        type: Sequelize.STRING,
        defaultValue: "https://player.listenlive.co/templates/StandardPlayerV4/webroot/img/default-cover-art.png"
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      genreId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Songs');
  }
};
