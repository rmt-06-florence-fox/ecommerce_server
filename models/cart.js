'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    
    static associate(models) {
      Cart.belongsTo(models.User, {foreignKey: 'UserId', targetKey: 'id'})
      Cart.hasMany(models.CartProduct, {foreignKey: 'CartId'})
    }
  };
  Cart.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Cart',
    hooks: {
      beforeCreate(cart) {
        if(!cart.status) {
          cart.status = 'on-process'
        }
      }
    }
  });
  return Cart;
};