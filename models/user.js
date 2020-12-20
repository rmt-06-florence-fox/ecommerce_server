'use strict';
const { Model } = require('sequelize');
const Helper = require('../helpers')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
      this.belongsToMany(models.Product, {
        through: models.Cart
      })
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
        user.password = Helper.hash(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};