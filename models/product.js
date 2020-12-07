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
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Stock is required!'
        },
        isNumeric: {
          msg: `Stock has to be in number format!`
        },
        min: {
          args: 1,
          message: `Only allow stock to be more than 1`
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Price is required!'
        },
        isNumeric: {
          msg: `Price has to be in number format!`
        },
        min: {
          args: 1,
          message: `Only allow price to be more than 1`
        }
      }
    },
    name:  {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: 'Product Name is required!'
        }
      }
    },
    description:  {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: 'Product description is required!'
        }
      }
    },
    image:  {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: 'Product image is required!'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};