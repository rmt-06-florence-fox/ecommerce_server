'use strict';
const {
  Model
} = require('sequelize');
const password = require('../helpers/password');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Product)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email has already been registered!'
      },
      validate: {
        notEmpty: 'Email cannot be empty!',
        notNull: 'Email cannot be empty!',
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: 'Password cannot be empty!',
        notNull: 'Password cannot be empty!',
        len: {
          args: [6],
          msg: 'Password too short! Password should have at least 6 chars length.'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'customer'
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance, option) => {
    instance.password = password.encrypt(instance.password)
  })
  return User;
};