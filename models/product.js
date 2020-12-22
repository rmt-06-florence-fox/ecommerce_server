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
      validate: {
        notEmpty: { msg: "Name cannot be empty" },
      }
    },
    image_url: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Price cannot be empty" },
        isInt: { msg: "Price must be Number" },
        min: { args: [0], msg: "Price cannot be negative" },
        max: { args: [5000000], msg: "Max Price IDR 5.000.000 per pcs" }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Stock cannot be empty" },
        isInt: { msg: "Stock must be Number" },
        min: { args: [0], msg: "Stock cannot be negative" },
        max: { args: [1000], msg: "Max Stock 1000 pcs per Item" }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};