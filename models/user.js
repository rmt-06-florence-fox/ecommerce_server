'use strict';
const { genHash } = require ('../helpers')

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
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Username Can't be Empty`
        },
        notNull: {
          msg: `Username Can't be Empty`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: `Email required to register`
        },
        notNull: {
          msg: `Email required to register`
        },
        isEmail: {
          msg: `Please enter valid email address`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6],
          msg: `minimum password length is 6 characters`
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: ['admin', 'customer'],
          msg: `User role is invalid`
        }
      }
    },
    address: DataTypes.TEXT
  }, {
    hooks: {
      beforeCreate: (user, opt) => {
          user.password = genHash (user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};