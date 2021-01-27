'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.ShoppingCart)
      Product.belongsToMany(models.User, {through: models.ShoppingCart})
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Name cannot be empty!'
        },
        notEmpty: {
          msg: 'Name cannot be empty!'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Image url cannot be empty!'
        },
        notEmpty: {
          msg: 'Image url cannot be empty!'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Price cannot be empty!'
        },
        notEmpty: {
          msg: 'Price cannot be empty!'
        },
        min: {
          args: [0],
          msg: 'Price cannot be negative!'
        },
        isNumeric: {
          msg: 'Only allow number input!'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Stock cannot be empty!'
        },
        notEmpty: {
          msg: 'Stock cannot be empty!'
        },
        min: {
          args: [0],
          msg: 'Stock cannot be negative!'
        },
        isNumeric: {
          msg: 'Only allow number input!'
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