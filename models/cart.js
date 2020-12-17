"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.Product);
      Cart.belongsTo(models.User);
    }
  }
  Cart.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "please enter user id",
          },
          notNull: {
            msg: "please enter user id",
          },
        },
      },
      ProductId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "please enter product id",
          },
          notNull: {
            msg: "please enter product id",
          },
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        validate: {
          min: {
            args: 1,
            msg: "minimum order is 1 pcs"
          }
        }
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        isIn: [[true, false]],
      },
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
