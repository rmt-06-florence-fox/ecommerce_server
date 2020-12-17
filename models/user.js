'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require("../helpers/hash")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Cart)
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (instance, option) => {
        instance.role = 'customer'
        instance.password = hashPass(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};