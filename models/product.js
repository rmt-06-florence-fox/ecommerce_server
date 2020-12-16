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
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:"name must be filled"
        }
      }
    },
    image_url: DataTypes.STRING,
    price: {
      type:DataTypes.INTEGER,
      validate:{
        min:{
          args:[0],
          msg:"stock/price can't be less than 0"
        },
        isInt:{
          msg:"stock/price must be a number"
        }
      }
    },
    stock: {
      type:DataTypes.INTEGER,
      validate:{
        min:{
          args:[0],
          msg:"stock/price can't be less than 0"
        },
        isInt:{
          msg:"stock/price must be a number"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};