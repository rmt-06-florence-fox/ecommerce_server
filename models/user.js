'use strict';
const {
  Model
} = require('sequelize');
const PassHelper = require('../helpers/passHelper');
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
    email: {
      type : DataTypes.STRING,
      validate :{
        isEmail :{
          args : true,
          msg : "must be a valid email format"
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      validate :{
        len : {
          args : [6, 20],
          msg : "must be between 6 to 20 characters"
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, options) => {
        user.role = 'customer'
        user.password = PassHelper.passGenerate(user.password)
        console.log(user.password);
      }
    }
  });
  return User;
};