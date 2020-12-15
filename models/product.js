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
      validate :{
        notEmpty : {
          args : true,
          msg : 'name can not be empty'
        }
      }
    },
    image_url: {
      type : DataTypes.STRING,
      validate :{
        notEmpty : {
          args : true,
          msg : 'image_url can not be empty'
        }
      }
    },
    price: {
      type : DataTypes.INTEGER,
      validate : {
        min : {
          args : [0],
          msg : 'price can not lower than 0'
        },
        isInt : {
          args : true,
          msg : 'price must be a number'
        }
      }
    },
    stock: {
      type : DataTypes.INTEGER,
      validate : {
        min : {
          args : [0],
          msg : 'stock can not lower than 0'
        },
        isInt : {
          args : true,
          msg : 'stock must be a number'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};