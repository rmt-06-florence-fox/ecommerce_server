'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.hasMany(models.Product)
    }
  };
  Category.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  Category.beforeCreate((instance, options) => {
    let name = instance.name

    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  })
  Category.beforeUpdate((instance, options) => {
    let name = instance.name

    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  })
  return Category;
};