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
      Cart.belongsTo(models.User,{foreignKey:"UserId"})
      Cart.belongsTo(models.Product,{foreignKey:"ProductId"})
    }
  };
  Cart.init({
    id:{ 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ProductId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    hooks: {
      beforeCreate(cart){
        cart.status = false
      }
    },
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};