'use strict';

const { hashPassword } = require('../helpers/bcrypt');
const { Model } = require('sequelize');
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
	}
	User.init(
		{
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: 'Email Cannot be Empty',
					},
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: 'Password Cannot be Empty',
					},
				},
			},
			role: DataTypes.STRING,
		},
		{
			hooks: {
				beforeCreate: (instance, options) => {
					instance.password = hashPassword(instance.password);
					instance.role = 'customer';
				},
			},
			sequelize,
			modelName: 'User',
		}
	);
	return User;
};
