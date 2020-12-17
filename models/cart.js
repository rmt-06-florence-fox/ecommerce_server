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
      Cart.belongsTo(models.User, {foreignKey: 'UserId'})
      Cart.belongsTo(models.Product, {foreignKey: 'ProductId'})
    }
  };
  Cart.init({
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: {
          args: [0],
          msg: 'Cannot insert minus quantity!'
        },
        isNumeric: {
          args: true,
          msg: 'Quantity is number only!'
        }
      }
    },
    checkout: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        notEmpty: {
          msg: `Status is required!`
        }
      }
    },
    ProductId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate(instance, options) {
        instance.quantity = 1;
        instance.checkout = false
      }
    },
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};