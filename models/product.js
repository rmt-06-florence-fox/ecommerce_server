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
          msg: 'Name must not be empty'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Image Url must not be empty'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Price must not be empty'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Stock must not be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};