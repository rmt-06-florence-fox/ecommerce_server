'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CartList.belongsTo(models.ShoppingCart, {foreignKey: 'CartId'})
      CartList.belongsTo(models.Product, {foreignKey: 'ProductId'})
    }
  };
  CartList.init({
    ProductId: DataTypes.INTEGER,
    CartId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CartList',
  });
  return CartList;
};