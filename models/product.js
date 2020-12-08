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
        notEmpty: { msg: 'name is required' },
        notNull: { msg: 'name is required' }
      }
    },
    image_url: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'please insert price correctly' },
        isNumeric: { msg: 'please insert price correctly'},
        notNegative(value){
          if( value < 0 ){
            throw new Error('price cannot be negative')
          }
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'please insert stock correctly'},
        isNumeric: { msg: 'please insert stock correctly'},
        notNegative(value){
          if( value < 0 ) {
            throw new Error('stock cannot be negative')
          }
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'please choose category'},
        notNull: { msg: 'please choose category'}
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};