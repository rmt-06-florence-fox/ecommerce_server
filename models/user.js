'use strict';
const Bcrypt = require('../helper/bcrypt')
const {
  Model
} = require('sequelize');
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
    email: {type: DataTypes.STRING,
    validate: {
      isEmail: {
        msg: 'Please input format email'
      },
      notEmpty: {
        msg: 'Fill the email'
      }
    }},
    password: {type: DataTypes.STRING,
    validate: {
      notEmpty: {
        msg: `Fill the password`
      },
      len: {
        args: [3, 100],
        msg: 'Password min 3 characters'
      }
    }},
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance, option) => {
    instance.password = Bcrypt.hash(instance.password)
  })
  User.beforeUpdate((instance, option) => {
    instance.password = Bcrypt.hash(instance.password)
  })
  return User;
};