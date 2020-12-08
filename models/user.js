'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword}= require('../helpers')
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
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{msg: "Name cannot be empty"},
        len:{
          args: [3,30],
          msg: "Name length allowed between 3-30 characters"
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate:{
        notEmpty: { msg: "Email cannot be empty" },
        isEmail:{msg: "Please input a valid email adress"}
      },
      unique:{
        msg: "Email already registered, please choose another email"
      }

    },
    password:{
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Password cannot be empty" },
        len: {
          args: [6, 20],
          msg: "please input strong password (min 6 characters)"
        }
      }
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (User, option) => {
        User.password = hashPassword(User.password)
        User.role= "Customer"
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};