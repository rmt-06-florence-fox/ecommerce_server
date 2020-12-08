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
        notNull: {
          args: true,
          msg: "Name is mandatory!"
        },
        notEmpty: {
          args: true,
          msg: "Name is mandatory!"
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Image url is mandatory!"
        },
        notEmpty: {
          args: true,
          msg: "Image url is mandatory!"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Price is mandatory!"
        },
        min: {
          args: [0],
          msg: 'Price must be greater than 0'
        },
        isNumeric: {
          args: true,
          msg: 'Price must be a number format'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Stock is mandatory!"
        },
        min: {
          args: [0],
          msg: 'Stock must be greater than 0'
        },
        isNumeric: {
          args: true,
          msg: 'Stock must be a number format'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};