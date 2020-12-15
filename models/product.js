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
      this.hasMany(models.Cart, {foreignKey: "ProductId", sourceKey: "id"})
      this.hasMany(models.Wishlist, {foreignKey: "ProductId", sourceKey: "id"})
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `name musn't be empty`
        },
        notNull: {
          msg: `name musn't be null`
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `image url musn't be empty`
        },
        notNull: {
          msg: `image url musn't be null`
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `category musn't be empty`
        },
        notNull: {
          msg: `category musn't be null`
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `price musn't be empty`
        },
        notNull: {
          msg: `price url musn't be null`
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `stock musn't be empty`
        },
        notNull: {
          msg: `stock url musn't be null`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};