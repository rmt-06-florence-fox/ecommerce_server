'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart.belongsTo(models.Product, {
        foreignKey: 'ProductId'
      })
      // define association here
    }
  };
  Cart.init({
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Missing User Id'
        }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Missing Product Id'
        }
      }
    },
    amount: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Amount can not be empty'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Status can not be empty'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};