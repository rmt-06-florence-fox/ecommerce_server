"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.User);
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Name is required, cannot be blank",
          },
        },
      },
      image_url: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Name is required, cannot be blank",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            args: true,
            msg: "Name is required, cannot be blank",
          },
          isNumeric: {
            args: true,
            msg: "Price must be number",
          },
          min: {
            args: [0],
            msg: "Cannot set to minus",
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        validate: {
          isNumeric: {
            args: true,
            msg: "Stock must be number",
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
