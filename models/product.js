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
        notNull: {
          args: true,
          msg: `Require Product stock`
        },
        notEmpty: {
          msg: `Require Product name`
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Require Product stock`
        },
        notEmpty: {
          msg: `Require Product image`
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Require Product price`
        },
        isNumeric: {
          msg: `Price must be a number`
        },
        isMinus(value) {
          if (value < 0) {
            throw new Error(`Price cant be minus`)
          }
        },
        falsy(value){
          if(!value){
            throw new Error('Require Product price')
          }
        }

      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Require Product stock`
        },
        isNumeric: {
          msg: `Stock must be a number`
        },
        isMinus(value) {
          if (value < 0) {
            throw new Error(`Stock cant be minus`)
          }
        },
        falsy(value){
          if(!value){
            throw new Error('Require Product stock')
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
}