'use strict';
const faker = require("faker");
const bcrypt = require("bcryptjs");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {username: "demouser", email: "demouser@yahoo.com", hashedPassword: bcrypt.hashSync("password")}
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ["demouser"]}
    }, {});
  }
};
