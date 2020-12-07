'use strict';
const {hash} = require('../helpers/encryption')

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
    email:{
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Email must be filled'
        },
        isEmail:{
          msg:'Wrong Email Format'
        }
      }
    },
    password:{
      type:DataTypes.STRING,
      validate:{
        len:{
          args:[6],
          msg:'Password must be at least 6 characters'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((instance,opt)=>{
    instance.password = hash(instance.password)
  })
  return User;
};