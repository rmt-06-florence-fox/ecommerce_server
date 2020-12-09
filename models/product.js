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
      Product.belongsToMany(models.Category,
        {through: models.ProductCategory,
          foreignKey: 'ProductId'
        })
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Product Name can't be empty`
        },
        notEmpty: {
          msg: `Product Name can't be empty`
        }
      }
    },
    image_url: DataTypes.TEXT,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Please set price for this product`
        },
        notNull: {
          msg: `Please set price for this product`
        },
        isInt: {
          msg: `Price column accept numbers only`
        },
        min: {
          args: 99,
          msg: `Price can't be lower than Rp 99`
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Please input stock for this product`
        },
        notEmpty: {
          msg: `Please input stock for this product`
        },
        isInt: {
          msg: `Stock only accept numbers`
        },
        minZero (value) {
          if (value < 0 ) {
            throw new Error (`Stock can't be lower than 0`)
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