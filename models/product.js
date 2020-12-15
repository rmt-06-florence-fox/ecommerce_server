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
      Product.belongsTo(models.Category)
      Product.belongsToMany(models.User,{ through : models.Cart })
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Name cannot be empty'
        }
      }
    },
    image_url: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Price cannot be empty'
        },
        min: {
          args: 1,
          msg: 'Price must be greater than 0'
        },
        isInt: {
          msg: 'Price must be a number'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Stock cannot be empty'
        },
        min: {
          args: 1,
          msg: 'Stock must be greater than 0'
        },
        isInt: {
          msg: 'Stock must be a number'
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};