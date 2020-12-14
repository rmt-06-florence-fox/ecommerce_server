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
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty : {
          msg: "name cannot be empty"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty : {
          msg: "email cannot be empty"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty : {
          msg: "password cannot be empty"
        }
      }
    },
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};