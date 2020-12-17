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
      // define association here
      Cart.belongsTo(models.Product)
      Cart.belongsTo(models.User)
    }
  };
  Cart.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1
      }
    }
  }, {
    hooks: {
      beforeUpdate: (instance, option) => {
        if(instance.quantity > Cart.quantity) {
          instance.quantity = Cart.quantity
        }
      }
    },
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};