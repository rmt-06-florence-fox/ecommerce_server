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
          msg: "Name cannot empty"
        },
        isAlpha: {
          args: true,
          msg: "You must input with alphabet"
        }
      }
    },
    image_url: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: {
        args: true,
        msg: "Image cannot empty"
      }
    }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [0],
          msg: "Price cannot be less then zero"
        },
        isNumeric: {
          args: true,
          msg: "You must input with number type"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [0],
          msg: "Stock cannot be less then zero"
        }
      },
      isNumeric: {
        args: true,
        msg: "You must input with number type"
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};