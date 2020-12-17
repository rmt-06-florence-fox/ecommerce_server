'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt.js')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.hasMany(models.Cart)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'email is required'},
        notNull: { msg: 'email is required'},
        isEmail: { msg: 'email must be email'}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'password cannot be empty'},
        notNull: { msg: 'password cannot be empty'},
        morethan6(value){
          if(value.length < 6){
            throw new Error('password must be longer than 6 characters')
          }
        }
      }
    },
    role: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate (user,opt){
        user.password = hashPassword(user.password);
        user.role = 'customer'
      }
    }
  });
  return User;
};