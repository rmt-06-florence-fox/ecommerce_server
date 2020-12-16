'use strict';
const Helper = require('../helpers/helper.js')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
  email: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: {
        args: true,
        msg: `Email must not be empty !`
      },
      isEmail: {
        args: true,
        msg: `Email must be in valid email format !` 
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: true,
      len: {
        args: [6],
        msg: `Password must have at least 6 characters !`
      }
    }
  },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user, opt) {
        user.password = Helper.createPassword(user.password)
      }
    }
  });
  return User;
};