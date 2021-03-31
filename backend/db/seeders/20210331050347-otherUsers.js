'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {username: "hansZimmy", email: "zimmerman@gmail.com", hashedPassword: bcrypt.hashSync("interstellar")},
      {username: "pattyStar", email: "pharrison@yahoo.com", hashedPassword: bcrypt.hashSync("pcKing")},
      {username: "bobSacamano", email: "bobSac@aol.com", hashedPassword: bcrypt.hashSync("8thAvenue")},
      {username: "Dr.X", email: "drX@wesleyan.edu", hashedPassword: bcrypt.hashSync("itsTed")},
      {username: "mommaBing", email: "norabing@gmail.com", hashedPassword: bcrypt.hashSync("poorChandler")}
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
