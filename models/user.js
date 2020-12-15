const bcrypt = require('bcryptjs')

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
      User.belongsToMany(models.Product, { through: models.Cart })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Email cannot be empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password cannot be empty'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args:[['User', 'Admin']],
          msg: 'Role must be User or Admin'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance, options) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(instance.password, salt)

    instance.role = 'User'
    instance.password = hash
  });
  return User;
};