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
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name is required"
        },
        notNull: {
          args: true,
          msg: "Name is required"
        }
      }},
    image_url: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Image is required"
        },
        notNull: {
          args: true,
          msg: "Image is required"
        }
      }},
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Price is required"
        },
        notNull: {
          args: true,
          msg: "Price is required"
        },
        validatePrice(value) {
          if(value < 0) {
            throw new Error('Price must greater than or equal to 0')
          }
        },
        isInt: {
          args: true,
          msg: "Price must in integer"
        }
      }},
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Stock is required"
        },
        notNull: {
          args: true,
          msg: "Stock is required"
        },
        validatePrice(value) {
          if(value < 0) {
            throw new Error('Stock must greater than or equal to 0')
          }
        },
        isInt: {
          args: true,
          msg: "Stock must in integer"
        }
      }}
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};