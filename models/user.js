'use strict';
const {hash} = require('../helper/bcrypt')
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
      this.hasMany(models.Product, {foreignKey: "UserId", sourceKey: "id"})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `email musn't be empty`
        },
        notNull: {
          msg: `email musn't be null`
        },
        isEmail: {
          msg: `it must be email format`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `password musn't be empty`
        },
        notNull: {
          msg: `password musn't be null`
        },
        len: {
          args: [8,20],
          msg: `minimum of password is 8`
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `role musn't be null`
        },
        isIn: {
          args: [['customer', 'admin']],
          msg: `your input is not recognizeable`
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(init, opt) {
        init.password = hash(init.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};