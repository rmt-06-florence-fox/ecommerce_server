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
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name cannot be blank'
        }
      }
    },
    image_url:{
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Image cannot be blank'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'price cannot be blank'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Stock cannot be blank'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};