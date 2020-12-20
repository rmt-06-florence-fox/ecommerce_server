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
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name can't be empty"
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "image_url can't be empty"
        }
      }
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull:false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Price can't be empty"
        },
        notNull: {
          args: true,
          msg: "Price can't be empty"
        },
        isNumeric: {
          args: true,
          msg: "Price must be a number"
        },
        notMinus(value) {
          if (value <= 0) {
            throw new Error('not minus or equal to 0(nol) price');
          }
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Stock can't be empty"
        },
        notNull: {
          args: true,
          msg: "Stock can't be empty"
        },
        isNumeric: {
          args: true,
          msg: 'Stock must be a number value'
        },
        notMinus(value) {
          if (value < 0) {
            throw new Error('Stock must graeter than 0(nol) or equal to 0(nol)');
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};