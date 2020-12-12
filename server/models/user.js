'use strict';
const {
  Model
} = require('sequelize');
const { hashed } = require("../helper/hashPass")

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
          msg: "email can't be empty"
        },
        isEmail: {
          args: true,
          msg: "must be in email format"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "password can't be empty"
        },
        len: {
          args: [6, 20],
          msg: "the password must be at least 6 characters long"
        }
      }
    },
    role: {
      type: DataTypes.STRING
    }
  }, {
    hooks: {
      beforeCreate(user, opt) {
        user.password = hashed(user.password)
        if(!user.role) {
          user.role = "customer"
        }
        // console.log(user)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};