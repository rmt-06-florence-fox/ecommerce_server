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
      this.belongsTo(models.Product);
    }
  };
  Cart.init({
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          args: true,
          msg: "UserId must be numeric."
        }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          args: true,
          msg: "ProductId must be numeric."
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          args: true,
          msg: "Quantity must be numeric."
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Cart',
    validate: {
      isMinQuantityOne() {
        if (this.price < 1) {
          throw new Error ("Quantity cannot be less than 1.");
        }
      }
    }
  });

  Cart.beforeCreate((instance, options) => {
    instance.quantity = 1;
  });

  return Cart;
};