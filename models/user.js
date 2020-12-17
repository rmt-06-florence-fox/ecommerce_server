'use strict';
const { hash } = require('bcrypt');
const {
  Model
} = require('sequelize');

const { hashPassword } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
      User.hasMany(models.Product, { foreignKey: 'UserId' })
      User.hasMany(models.Cart, { foreignKey: 'UserId' })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          message: 'Please enter your email.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          message: 'Please enter your password.'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user) {
        user.password = hashPassword(user.password);
        if(!user.role) {
          user.role = 'user';
        }
      }
    }
  });
  return User;
};