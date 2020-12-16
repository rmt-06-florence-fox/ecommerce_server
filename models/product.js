'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    
    static associate(models) {
      this.belongsToMany(models.User, {
        through: models.Cart
      })
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
        isInt: {
          msg: "Price must be INTEGER !"
        },
        min : {
          args : [1],
          msg : "Price cannot be less than 1"
        }
      }
    },
    stock: {
      type : DataTypes.INTEGER,
      validate : {
        isInt : {
          msg : "Stock must be INTEGER !"
        },
        min : {
          args : [0],
          msg : "Stock cannot be negative !"
        }
      }
    
    },
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};