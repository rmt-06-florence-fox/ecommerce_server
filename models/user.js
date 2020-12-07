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
      unique : {
        msg : "Oops, someone else has been using this user name"
      }
    },
    role: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: {
        msg : "Looks like this email has already been used by another user"
      },
      validate : {
        notEmpty : {
          msg : "Email cannot be empty"
        },
        isEmail : {
          msg : "Please check your email, was its format correct ?"
        }
      }
    },
    password:{ 
      type : DataTypes.STRING,
      validate : {
        len : {
          args : [6, 200],
          msg : "Your password should be at least 6 characters"
        }
      }
    
    }
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