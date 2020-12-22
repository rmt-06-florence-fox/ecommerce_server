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
      Product.belongsToMany(models.Category, {through: models.ProductCategory})
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          args: true,
          msg: 'name is required'
        },
      }},
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          args: true,
          msg: `image is required`
        }
      }},
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: `price is required`
        },
        isInt: {
          args: true,
          msg: `price must be number`
        },
        min: {
          args: [0],
          msg: `price must be greater than 0`
        }
      }},
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: `stock is required`
        },
        isInt: {
          args: true,
          msg: `stock must be number`
        },
        min: {
          args: [0],
          msg: `stock must be greater than 0`
        }
      }},
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};