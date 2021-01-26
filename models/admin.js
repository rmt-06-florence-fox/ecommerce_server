'use strict';
const {
  Model
} = require('sequelize');
const {generatePassword} = require('../helper/helper_password')
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Admin.hasMany(models.Cart)
    }
  };
  Admin.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Email must be formatted on example@gmail.com'
        },
        notEmpty: {
          args: true,
          msg: 'Email is required'
        }      
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password is required'
        },
        len: {
          args: [5],
          msg: 'Password must be contain by minimum 6 characters'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Admin',
  });
   Admin.addHook('beforeCreate', (instance, option) => {
    
    const password = generatePassword(instance.password)
    instance.password = password
  })
  return Admin;
};