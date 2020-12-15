'use strict';
const { hashPwd } = require('../helpers/password')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Cart)
    }
  };
  Customer.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "email is already used"
      },
      validate: {
        notEmpty : {
          args: true,
          msg: "email is required"
        },
        isEmail: {
          args: true,
          msg: "input must be a valid email address"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          args: true,
          msg: "password is required"
        }
      }
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (customer, opt) => {
        customer.password = hashPwd(customer.password)
        customer.role = 'customer'
      }
    },
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};