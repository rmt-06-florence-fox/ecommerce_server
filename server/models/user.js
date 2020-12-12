'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "Email is required"
        },
        notNull : {
          args: true,
          msg : "Email is required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        len: {
          args: [5, 10],
          msg: "password must be or longer than 5"
        }
      }
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(user){
        user.password = hash(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};