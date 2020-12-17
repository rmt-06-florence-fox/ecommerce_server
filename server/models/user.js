"use strict";
const { hash } = require("../helpers/bcrypt-helper");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Cart);
      User.belongsToMany(models.Product, { through: models.Cart });
      User.hasMany(models.WishList);
      User.belongsToMany(models.Product, { through: models.WishList });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "email required",
          },
          isEmail: {
            args: true,
            msg: "email format required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "password required",
          },
        },
      },
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.addHook("beforeCreate", (instance, options) => {
    let hashed = hash(instance.password);
    instance.role = "customer";
    instance.password = hashed;
  });

  return User;
};
