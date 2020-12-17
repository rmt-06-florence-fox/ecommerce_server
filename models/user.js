'use strict';
const {
  Model
} = require('sequelize');
const Bcrypt = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Product, {
        through: 'Carts',
        foreignKey: 'UserId'
      })
      User.belongsToMany(models.Product, {
        through: 'Wishlists',
        foreignKey: 'UserId'
      })
    }
  };
  User.init({
    firstName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Firstname can not be empty'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Lastname can not be empty'
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'gender can not be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: 'Email has already registered'
      },
      validate: {
        notEmpty: {
          msg: 'Email can not be empty'
        },
        isEmail: {
          msg: 'Email must be email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Password can not be empty'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'role can not be ermpty'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = Bcrypt.hash(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};