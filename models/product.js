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
    name: {type: DataTypes.STRING,
    validate: {
      notEmpty: {
        msg: `Fill the name`
      }
    }},
    image_url: {type: DataTypes.STRING,
    validate: {
      notEmpty:{
        msg: `Fill the image url`
      }
    }},
    price: {type: DataTypes.INTEGER,
    validate: {
      notEmpty:{
        msg: `Fill the price`
      },
      isInt: {
        msg: `Price Invalid`
      },
      min:{
        args: [0],
        msg: `Price Invalid`
      }
    }},
    stock: {type: DataTypes.INTEGER,
    validate: {
      notEmpty:{
        msg: `Fill the stock`
      },
      isInt: {
        msg: `Stock Invalid`
      },
      min:{
        args: [0],
        msg: `Stock Invalid`
      }
    }}
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};