'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {

    }
  };
  User.init({
    fullName: DataTypes.STRING,
    userName: {
      type : DataTypes.STRING,
      unique : true
    },
    role: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  }, {
    hooks : {
      beforeCreate(user, option){
        if (!user.role) user.role = 'customer'
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};