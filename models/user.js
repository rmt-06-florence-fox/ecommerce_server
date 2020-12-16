'use strict';
const {
  Model
} = require('sequelize');

const { encryptPass } = require('../helper/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Product , {through: 'Carts'})
      // define association here
    }
  };
  User.init({
    email: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : 'wrong email/password'
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "wrong email/password"
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((instance,option) =>{
    instance.password = encryptPass(instance.password)
    if (instance.role === '' || instance.role ===  undefined || instance.role || null) {
      instance.role = 'customer'
    }
  })
  return User;
};