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
      Banner.belongsTo(models.User, { foreignKey: "UserId" })
    }
  };
  Banner.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Title required'
        }
      }
    },
    status: DataTypes.BOOLEAN,
    image_url: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Image URL required'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate(banner) {
        banner.status = false
      }
    },
    sequelize,
    modelName: 'Banner',
  });
  return Banner;
};