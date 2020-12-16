'use strict';

const { hashPassword } = require('../helpers/bcrypt');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		let dataAdmin = require('../data/user-admin.json');
		dataAdmin.forEach((el) => {
			el.password = hashPassword(el.password);
			el.createdAt = new Date();
			el.updatedAt = new Date();
		});
		await queryInterface.bulkInsert('Users', dataAdmin, {});
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete('Users', null, {});
	},
};
