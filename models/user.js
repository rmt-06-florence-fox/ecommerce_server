'use strict';
const bcrypt = require('bcryptjs')
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
      User.hasMany(models.Product)
      User.belongsToMany(models.Product, {through : models.Cart, foreignKey : "UserId"})
    }
  };
  User.init({
    email: {
      type : DataTypes.STRING,
      validate : {
        isEmail : {
          args : true, 
          msg : "Must be an email"
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        len : {
          args : [6],
          msg : "Minimun 6 characters"
        }
      }
    },
    role: DataTypes.STRING
  }, {
    hooks : {
      beforeCreate : (user, options) => {
        let salt = bcrypt.genSaltSync(8)
        user.password = bcrypt.hashSync(user.password, salt)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};