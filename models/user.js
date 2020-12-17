'use strict';
const {encryptPassword} = require('../helpers/bcrypt')
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
      User.hasMany(models.Cart)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email must not be empty'
        },
        isEmail: {
          args: true,
          msg: 'Email field input must be an email formatted'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password must not be empty'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(user, opt) {
        user.password = encryptPassword(user.password)
        if (!user.role) {
          user.role = 'customer'
        }
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};