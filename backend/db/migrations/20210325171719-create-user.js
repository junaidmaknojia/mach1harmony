'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING(30)
      },
      email: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING(256)
      },
      hashedPassword: {
        allowNull: false,
        type: Sequelize.STRING.BINARY
      },
      profilePic: {
        type: Sequelize.STRING,
        defaultValue: 'https://react-project.s3.us-east-2.amazonaws.com/profilePics/default.jpg'
      },
      bio: {
        type: Sequelize.STRING(300),
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
