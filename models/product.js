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
      validate:{
        notEmpty:{
          args: true, 
          msg: `Name of product can't be empty`
        }
      }
    },
    image_url:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          args: true, 
          msg: `Image URL of product can't be empty`
        }
      }
    },
    price:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty:{
          args: true, 
          msg: `Price of product can't be empty`
        },
        isInt: {
          args: true, 
          msg: `Price of product must be an integer `
        },
        min:{
          args: [0],
          msg: `Price of product must be more than 0`
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty:{
          args: true, 
          msg: `Stock of product can't be empty`
        },
        isInt: {
          args: true, 
          msg: `Stock of product must be an integer `
        },
        min:{
          args: [0],
          msg: `Stock of product must be more than 0`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};