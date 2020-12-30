'use strict';
const _ = require('lodash')
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
    title: DataTypes.STRING,
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Status Required`
        },
        isBoolean: function (val) {
          if (!_.isBoolean(val)) {
            throw new Error('Status Must Boolean');
          }
        }
      }
    },
    image_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Banner',
  });

  Banner.beforeCreate((banner, opt) => {
    if (!banner.title || banner.title.trim == '') {
      banner.title = 'Untitled'
    }
    if (!banner.image_url || banner.image_url.trim == '') {
      banner.image_url = 'https://source.unsplash.com/random'
    }
  })

  Banner.beforeUpdate((banner, opt) => {
    if (!banner.title || banner.title.trim == '') {
      banner.title = 'Untitled'
    }
    if (!banner.image_url || banner.image_url.trim == '') {
      banner.image_url = 'https://source.unsplash.com/random'
    }
  })

  return Banner;
};