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
      Product.hasMany(models.WishList)
    }
  };
  Product.init({
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Stock is required!'
        },
        notNull: {
          args: true,
          msg: 'Stock is required!'
        },
        isNumeric: {
          args: true,
          msg: `Stock has to be in number format!`
        },
        min: {
          args: 1,
          msg: `Only allow stock to be more than 1`
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Price is required!'
        },
        notNull: {
          args: true,
          msg: 'Price is required!'
        },
        isNumeric: {
          args: true,
          msg: `Price has to be in number format!`
        },
        min: {
          args: 1,
          msg: `Only allow price to be more than 1`
        }
      }
    },
    name:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Product Name is required!'
        },
        notNull: {
          args: true,
          msg: 'Product Name is required!'
        }
      }
    },
    description:  {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Product description is required!'
        },
        notNull: {
          args: true,
          msg: 'Product description is required!'
        }
      }
    },
    image:  {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Product image is required!'
        },
        notNull: {
          args: true,
          msg: 'Product image is required!'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};