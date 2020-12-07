'use strict';
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
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'email is mandatory!'
        },
        notEmpty: {
          args: true,
          msg: 'email is mandatory!'
        },
        isEmail: {
          args: true,
          msg: 'please check again your format email!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len:{
          args: [6],
          msg: 'password minimum six characters'
        },
        notNull: {
          args: true,
          msg: 'password is mandatory!'
        },
        notEmpty: {
          args: true,
          msg: 'password is mandatory!'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};