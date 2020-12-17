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
      Product.hasMany(models.Wishlist)
      Product.hasMany(models.Transaction)
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Book name should not be empty"
        },
        notNull: {
          msg: "Book name should not be empty"
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Image URL should not be empty"
        },
        notNull: {
          msg: "Image URL should not be empty"
        }
      }
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Price should not be empty"
        },
        notNull: {
          msg: "Price should not be empty"
        },
        isLessThanZero(value){
          if(value < 0){
            throw new Error('Price should not be less than 0');
          }
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Stock should not be empty"
        },
        notNull: {
          msg: "Stock should not be empty"
        },
        isLessThanZero(value){
          if(value < 0){
            throw new Error('Stock should not be less than 0');
          }
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};