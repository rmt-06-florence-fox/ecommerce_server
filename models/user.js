'use strict';
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
    email:{
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate:{
        notEmpty:{
          args: true,
          msg: `Email can't be empty`
        },
        isEmail:{
          args: true,
          msg: `Email must be formatted in example@mail.com`
        }
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          args: true,
          msg: `Password can't be empty`
        },
        len:{
          args: [6],
          msg: `Password must be contain minimum 6 characters`
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};