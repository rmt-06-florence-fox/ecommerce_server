'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      this.hasMany(models.Product);
    }
  };
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Category name is required."
        },
        notEmpty: {
          args: true,
          msg: "Category name is required."
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};