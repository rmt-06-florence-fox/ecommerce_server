"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Product);
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "username taken",
        },
        validate: {
          notEmpty: {
            args: true,
            msg: "Username is required, cannot be blank",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "customer",
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "Email have been registered",
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Password is required, cannot be blank",
          },
          len: {
            args: [6],
            msg: "Password minimal 6 character",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
