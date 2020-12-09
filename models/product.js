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
        notEmpty: {
          msg: 'Name Required'
        },
        notNull: {
          msg: 'Name Required'
        },
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Name Required'
        },
        notNull: {
          msg: 'Name Required'
        },
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Name Required'
        },
        notNull: {
          msg: 'Name Required'
        },
        isInt: {
          msg: 'Price must be an Integer'
        },
        min: {
          args: [0],
          msg: 'Price must be greater than 0'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'Stock must be an Integer'
        },
        notEmpty: {
          msg: 'Name Required'
        },
        notNull: {
          msg: 'Name Required'
        },
        min: {
          args: [0],
          msg: 'Stock must be greater than 0'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};