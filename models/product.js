'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    name: {
      type : DataTypes.STRING,
      validate : {
        len : {
          args : [3, 100],
          msg : "There should be at least 3 characters in product's name"
        }
      }
    },
    imageUrl:{ 
      type : DataTypes.STRING,
      validate : {
        isUrl : {
          msg : "Please submit the correct image's url format"
        }
      }
    
    },
    price: {
      type : DataTypes.INTEGER,
      validate : {
        min : {
          args : [1],
          msg : "Price cannot be less than 1"
        }
      }
    },
    stock: {
      type : DataTypes.INTEGER,
      validate : {
        min : {
          args : [0],
          msg : "Stock cannot be negative !"
        }
      }
    
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};