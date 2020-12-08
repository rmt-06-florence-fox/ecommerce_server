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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email has already exist"
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "Email is required"
        },
        notNull: {
          args: true,
          msg: "Email is required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        valcount(value) {
          if (value.length < 6) {
            throw new Error("Password length minimum 6 characters")
          }
        },
        notEmpty: {
          args: true,
          msg: "Password is required"
        },
        notNull: {
          args: true,
          msg: "Password is required"
        }
      }},
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Role is required"
        },
        notNull: {
          args: true,
          msg: "Role is required"
        }
      }}
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};