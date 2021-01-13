'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.Cart, {foreignKey: 'id'})
      this.belongsToMany(models.User, { through: 'Carts', foreignKey: 'ProductId' })
      // this.hasMany(models.Cart, {foreignKey: 'UserId'})
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Product's name is required`
        }
      }
    },
    image_url: DataTypes.STRING,
    category: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};