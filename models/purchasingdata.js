'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PurchasingData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {foreignKey: "UserId", targetKey: "id"})
      this.belongsTo(models.Product, {foreignKey: "ProductId", targetKey: "id"})
    }
  };
  PurchasingData.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    totalItem: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    buyStatus: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'PurchasingData',
  });
  return PurchasingData;
};