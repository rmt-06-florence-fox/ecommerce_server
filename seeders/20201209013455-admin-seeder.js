'use strict';
const {hash} = require('../helpers/encryption')
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
    let admins = require('../data/admins.json')
    admins.forEach(item => {
      item.password = hash(item.password)
      item.createdAt = new Date()
      item.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Users',admins)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users')
  }
};
