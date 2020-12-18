'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.User, { foreignKey: 'UserId' })
      Cart.belongsTo(models.Product, { foreignKey: 'ProductId' })
    }
  };
  Cart.init({
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "ProductId cannot empty"
        },
        notNull: {
          msg: "ProductId cannot null"
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "UserId cannot empty"
        },
        notNull: {
          msg: "UserId cannot null"
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Quantity cannot empty"
        },
        notNull: {
          msg: "Quantity cannot null"
        },
        isMin (value) {
          if (value < 0) {
            throw new Error ('cannot be minus')
          }
        }
      }
    },
    Status: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};