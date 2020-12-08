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
      Product.belongsTo(models.User)
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          msg: "name is required"
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          msg: "image is required"
        },
        isUrl : {
          msg: "input must be a valid url"
        }
      }
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          msg: "price is required"
        },
        min: {
          args: 1,
          msg: "price cannot be a negative value"
        },
        isDecimal: {
          args: true,
          msg: "input must be a valid number"
        }
      }
    },
    stock: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          msg: "stock is required"
        },
        min: {
          args: 1,
          msg: "stock cannot be a negative value"
        },
        isDecimal: {
          args: true,
          msg: "input must be a valid number"
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