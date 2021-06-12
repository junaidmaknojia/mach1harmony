'use strict';
const {Validator} = require("sequelize");
const bcrypt = require("bcryptjs");
// const {Op} = require("sequelize");


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4,30],
        isNotEmail(value){
          if(Validator.isEmail(value)){
            throw new Error("Cannot be an email");
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3,256]
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60,60]
      }
    },
    profilePic: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    defaultScope: { // doesn't allow these values below to be returned in a query
      attributes: {
        exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
      }
    },
    scopes: {
      currentUser: {
        attributes: {exclude: ["hashedPassword"]}
      },
      loginUser: {
        attributes: {}
      }
    }
  });

  User.prototype.toSafeObject = function(){
    const {id, username, email} = this;
    return {id, username, email};
  }

  User.prototype.validatePassword = function(password){
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  }

  User.getCurrentUserById = async function(id){
    return await User.scope("currentUser").findByPk(id);
  }

  User.login = async function({credential, password}){
    const { Op } = require('sequelize');
    const user = await User.scope("loginUser").findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential
        }
      }
    });

    if(user && user.validatePassword(password)){
      return await User.scope("currentUser").findByPk(user.id);
    }
  }

  User.signup = async function({username, email, password, profilePic}){
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({username, email, hashedPassword, profilePic});
    return await User.scope("currentUser").findByPk(user.id);
  }

  User.associate = function(models) {
    User.hasMany(models.Song, {foreignKey: "userId"});
    User.hasMany(models.Like, {foreignKey: "userId"});
    User.hasMany(models.Comment, {foreignKey: "userId"});
    User.belongsToMany(models.User, {
      through: "Follows",
      as: "otherPeople",
      foreignKey: "followerId",
      otherKey: "userId"
    });
    User.hasMany(models.Follow, {foreignKey: "userId"});
  };
  return User;
};
