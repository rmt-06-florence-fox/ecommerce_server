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
      Product.belongsTo(models.User)
      Product.belongsToMany(models.User, {through : models.Cart, foreignKey : "ProductId"})
    }
  };
  Product.init({
    name: {
      type : DataTypes.STRING,
      validate : {
        len : {
          args : [3],
          msg : "Product name minimal 3 Characters"
        }
      }
    },
    image_url: {
      type : DataTypes.STRING,
      validate : {
        isUrl : {
          args : true,
          msg : "image url must be in url format"
        }
      }
    },
    price: {
      type : DataTypes.INTEGER,
      validate : {
        min : {
          args : 1,
          msg : "minimum price Rp. 1"
        }
      }
    },
    stock: {
      type : DataTypes.INTEGER,
      validate : {
        min : {
          args : 1,
          msg : "minimum stock 1"
        }
      }
    },
    description: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};