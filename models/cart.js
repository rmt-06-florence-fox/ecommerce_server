'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.User)
      this.belongsTo(models.Product)
    }
  };
  Cart.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate (cart, option) {
        if (!cart.quantity) cart.quantity = 1
      }
    },
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};