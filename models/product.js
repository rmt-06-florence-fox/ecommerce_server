'use strict';
const {
  Model
} = require('sequelize');

const { pascalCase } = require('../helpers/pascalCase')

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, {foreignKey: 'UserId'})
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "product name is required"
        },
        notNull: {
          args: true,
          msg: "product name is required"
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: {
          args: true,
          msg: "link is invalid"
        },
        notEmpty: {
          args: true,
          msg: "link is required"
        },
        notNull: {
          args: true,
          msg: "link is required"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "price is required"
        },
        notNull: {
          args: true,
          msg: "price is required"
        },
        min: {
          args: 1,
          msg: "price can't be negative"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "stock is required"
        },
        notNull: {
          args: true,
          msg: "stock is required"
        },
        min: {
          args: 1,
          msg: "stock can't be negative"
        }
      }
    },
    UserId: DataTypes.INTEGER,
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "category is required"
        },
        notNull: {
          args: true,
          msg: "category is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  Product.beforeCreate((instance, options) => {
    instance.category = pascalCase(instance.category)
  })

  return Product;
};