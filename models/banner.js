'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Banner.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          args: true,
          msg: "banner title is required"
        },
        notNull: {
          args: true,
          msg: "banner title is required "
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          args: true,
          msg: "banner status is required"
        },
        notNull: {
          args: true,
          msg: "banner status is required"
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          args: true,
          msg: "banner image is required"
        },
        notNull: {
          args: true,
          msg: "banner image is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Banner',
  });
  return Banner;
};