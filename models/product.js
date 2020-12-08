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
      type : DataTypes.STRING,
      validate : {
        notEmpty :{
          msg : 'Name required'
        }
      }
    },
    image_url: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : 'image Url Required'
        }
      }
    },
    price: {
      type : DataTypes.INTEGER,
      validate : {
        isNumeric : {
          msg : 'Please insert the right price'
        },
        min : {
          msg : 'Please insert the right price',
          args : 1
        }
      }
    },
    stock: {
      type : DataTypes.INTEGER,
      validate : {
        isNumeric : {
          msg : "Please insert the right stock"
        },
        min : {
          msg : 'Please insert the right stock',
          args : 1
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};