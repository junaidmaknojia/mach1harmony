'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {username: "lilHans", email: "zimmerman@gmail.com", hashedPassword: bcrypt.hashSync("interstellar"), profilePic: "https://react-project.s3.us-east-2.amazonaws.com/profilePics/default.jpg"},
      {username:"nycGlider", email:"emmanuel@gmail.com", hashedPassword: bcrypt.hashSync("nycView"), profilePic:"https://react-project.s3.us-east-2.amazonaws.com/profilePics/emmanuel.jpg"},
      {username:"cheers4Cochrain", email:"tyler@gmail.com", hashedPassword: bcrypt.hashSync("basicBoy"), profilePic:"https://react-project.s3.us-east-2.amazonaws.com/profilePics/tyler.jpg"},
      {username:"lightWaves90", email:"gina@gmail.com", hashedPassword: bcrypt.hashSync("ambientLight"), profilePic:"https://react-project.s3.us-east-2.amazonaws.com/profilePics/gina.jpg"},
      {username:"wineAndShine", email:"rose@gmail.com", hashedPassword: bcrypt.hashSync("napaMILF"), profilePic:"https://react-project.s3.us-east-2.amazonaws.com/profilePics/rose.jpg"},
      {username:"queensBounty", email:"jessica@gmail.com", hashedPassword: bcrypt.hashSync("smilingGirl"), profilePic:"https://react-project.s3.us-east-2.amazonaws.com/profilePics/jessica.jpg"},
      {username:"theKennedy", email:"jfk@gmail.com", hashedPassword: bcrypt.hashSync("becauseItIsHard"), profilePic:"https://react-project.s3.us-east-2.amazonaws.com/profilePics/jfk.jpg"},
      {username: "pattyStar", email: "pharrison@yahoo.com", hashedPassword: bcrypt.hashSync("pcKing"), profilePic: "https://react-project.s3.us-east-2.amazonaws.com/profilePics/default.jpg"},
      {username: "bobSacamano", email: "bobSac@aol.com", hashedPassword: bcrypt.hashSync("8thAvenue"), profilePic: "https://react-project.s3.us-east-2.amazonaws.com/profilePics/default.jpg"},
      {username: "Dr.X", email: "drX@wesleyan.edu", hashedPassword: bcrypt.hashSync("itsTed"), profilePic: "https://react-project.s3.us-east-2.amazonaws.com/profilePics/default.jpg"},
      {username: "mommaBing", email: "norabing@gmail.com", hashedPassword: bcrypt.hashSync("poorChandler"), profilePic: "https://react-project.s3.us-east-2.amazonaws.com/profilePics/default.jpg"},
      {username:"damnitJerry", email:"jerry@gmail.com", hashedPassword: bcrypt.hashSync("godDamnitJerry"), profilePic: "https://react-project.s3.us-east-2.amazonaws.com/profilePics/default.jpg"},
      {username:"partyWithOSHA", email:"osha@gmail.com", hashedPassword: bcrypt.hashSync("regulations247"), profilePic: "https://react-project.s3.us-east-2.amazonaws.com/profilePics/default.jpg"},
      {username:"catInTheHood", email:"cat@gmail.com", hashedPassword: bcrypt.hashSync("redFishBlueFish"), profilePic: "https://react-project.s3.us-east-2.amazonaws.com/profilePics/default.jpg"},
      {username:"sophiaSings", email:"sophia@gmail.com", hashedPassword: bcrypt.hashSync("redSweaters"), profilePic:"https://react-project.s3.us-east-2.amazonaws.com/profilePics/sophia.jpg"},
      {username:"westCoastTunes", email:"lauren@gmail.com", hashedPassword: bcrypt.hashSync("gingerHair"), profilePic:"https://react-project.s3.us-east-2.amazonaws.com/profilePics/lauren.jpg"},
      {username:"tangoTuesdays", email:"moses@gmail.com", hashedPassword: bcrypt.hashSync("orangeBackground"), profilePic:"https://react-project.s3.us-east-2.amazonaws.com/profilePics/moses.jpg"},
      {username:"northGrass00", email:"mathias@gmail.com", hashedPassword: bcrypt.hashSync("timothyKid"), profilePic:"https://react-project.s3.us-east-2.amazonaws.com/profilePics/mathias.jpg"},
      {username:"tinkerBellDShrew", email:"eleanor@gmail.com", hashedPassword: bcrypt.hashSync("blueEyes"), profilePic:"https://react-project.s3.us-east-2.amazonaws.com/profilePics/eleanor.jpg"}
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
