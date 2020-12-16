'use strict';
const {
  Model
} = require('sequelize');
const {hashPass} = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, {foreignKey: 'UserId'})
      User.hasMany(models.Cart, {foreignKey: 'UserId'})
      User.hasMany(models.Wishlist, {foreignKey: 'UserId'})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate:{
        notEmpty:{
          args: true,
          msg: `Email is required!`
        },
        isEmail:{
          msg: `Email must be a format sample@mail.com`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          args: true,
          msg: `Password is required!`
        },
        len:{
          args: [6],
          msg: `Password must be more than 6 character`
        }
      }
    },
    role: DataTypes.STRING
  }, {
    hooks:{
      beforeCreate(user) {
        user.password = hashPass(user.password)
        user.role = 'customer'
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};