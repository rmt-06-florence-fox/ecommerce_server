'use strict';
var bcrypt = require('bcryptjs');
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
      // this.hasMany(models.Product)
      this.belongsToMany(models.Product, { through: 'Carts', foreignKey: 'UserId' })
      // this.belongsTo(models.Cart)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Email is required'
        },
        isEmail: {
          msg: 'Email must valid'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [['admin', 'customer']],
          msg: 'Role has to be either admin or customer'
        }
      }
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        if (!instance.role) {
          instance.role = 'customer'
        }

        var salt = bcrypt.genSaltSync(8);
        instance.password = bcrypt.hashSync(instance.password, salt);
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};