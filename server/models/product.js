"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.Cart);
      Product.belongsToMany(models.User, { through: models.Cart });
      Product.hasMany(models.WishList);
      Product.belongsToMany(models.User, { through: models.WishList });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "name required",
          },
        },
      },
      image_url: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "image_url required",
          },
        },
      },
      price: {
        type: DataTypes.DOUBLE,
        validate: {
          isNumeric: {
            args: true,
            msg: "must be number",
          },
          noMinus(value) {
            if (value < 0) {
              throw new Error("price must be greater than 0");
            }
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        validate: {
          isNumeric: {
            args: true,
            msg: "must be number",
          },
          noMinus(value) {
            if (value <= 0) {
              throw new Error("stock must be greater than 1");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
