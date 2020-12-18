'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    static associate(models) {
    }
  };
  History.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name is required"
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Image Url is required"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Price is required"
        },
        notNull:{
          msg: "Price cannot be null"
        },
        min:{
          args: [0],
          msg: "Minimum price is 0"
        },
        isNumeric:{
          msg: "Only Number is Allowed"
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Quantity is required'
        },
        notNull: {
          msg: 'Quantity cannot be null'
        },
        min: {
          args: [1],
          msg: 'Min quantity is 1'
        },
        isNumeric:{
          msg: "Only Number is Allowed"
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'UserId is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};