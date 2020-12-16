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
      Product.belongsTo(models.User, {foreignKey: 'UserId'})
      Product.hasMany(models.Cart, {foreignKey: 'ProductId'})
      Product.hasMany(models.Wishlist, {foreignKey: 'ProductId'})
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          msg: `Name is required!`
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          msg: `Image url is required!`
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: 'Cannot insert minus price!'
        },
        isNumeric: {
          args: true,
          msg: 'Price is number only!'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: 'Cannot insert minus stock!'
        },
        isNumeric: {
          args: true,
          msg: 'Stock is number only!'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          msg: `Category is required!`
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};