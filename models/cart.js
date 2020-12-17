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
      Cart.belongsTo(models.User)
      Cart.belongsTo(models.Product)
    }
  };
  Cart.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'insert quantity correctly'},
        notNegative(value){
          if(value < 0){
            throw new Error('cannot be negative')
          }
        }
      }
    },
    price: DataTypes.INTEGER,
    total: {
      type: DataTypes.VIRTUAL,
      get(){
        return this.quantity * this.price
      },
      set(val){
        throw new Error('cannot change total')
      }
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};