'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartProduct extends Model {
    
    static associate(models) {
      CartProduct.belongsTo(models.Cart, {foreignKey:'CartId', targetKey: 'id'})
      CartProduct.belongsTo(models.Product, {foreignKey:'ProductId', targetKey: 'id'})
    }
  };
  CartProduct.init({
    CartId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'CartProduct',
  });
  return CartProduct;
};