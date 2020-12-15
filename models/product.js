'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.Cart)
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name is required"
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Image Url is required"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Price is required"
        },
        notNull:{
          msg: "Price cannot be null"
        },
        min:{
          args: [0],
          msg: "Minimum price is 0"
        },
        isNumeric:{
          msg: "Only Number is Allowed"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Stock is required"
        },
        notNull:{
          msg: "Stock cannot be null"
        },
        min:{
          args: [0],
          msg: "Minimum stock is 0"
        },
        isNumeric:{
          msg: "Only Number is Allowed"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};