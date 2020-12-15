'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Cart)
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'All fields must not be empty'
        },
        isString(value) {
          if (typeof value !== 'string') {
            throw new Error("Name must be a string value, image_url must be a string value, price must be a number value and stock must be a number value")
          }
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'All fields must not be empty'
        },
        isString(value) {
          if (typeof value !== 'string') {
            throw new Error("Name must be a string value, image_url must be a string value, price must be a number value and stock must be a number value")
          }
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'All fields must not be empty'
        },
        isBelowZero(value) {
          if (value < 0) {
            throw new Error('The price field value must not less than 0')
          }
        },
        isInt: {
          args: true,
          msg: "Name must be a string value, image_url must be a string value, price must be a number value and stock must be a number value"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'All fields must not be empty'
        },
        isBelowZero(value) {
          if (value < 0) {
            throw new Error('The stock field value must not less than 0')
          }
        },
        isInt: {
          args: true,
          msg: "Name must be a string value, image_url must be a string value, price must be a number value and stock must be a number value"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};