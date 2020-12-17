"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class WishList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      WishList.belongsTo(models.User);
      WishList.belongsTo(models.Product);
    }
  }
  WishList.init(
    {
      UserId: DataTypes.INTEGER,
      ProductId: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "WishList",
    }
  );
  WishList.addHook("beforeCreate", (instance, options) => {
    instance.status = "true";
  });
  return WishList;
};
