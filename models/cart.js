'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.User)
      Cart.belongsTo(models.Product)
    }
  };
  Cart.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'UserId is required'
        }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'UserId is required'
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Quantity is required'
        },
        notNull: {
          msg: 'Quantity cannot be null'
        },
        min: {
          args: [0],
          msg: 'Min quantity is 0'
        },
        isNumeric:{
          msg: "Only Number is Allowed"
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Status is required'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};