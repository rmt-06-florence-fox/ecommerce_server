'use strict';
const { hash } = require("../helpers/bcrypt")
const passwordAdmin = hash('123456')

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
      return queryInterface.bulkInsert('Users', [{
          name: 'tommy',
          email: 'tommysusanto77@gmail.com',
          password: passwordAdmin,
          status: 'admin',
          createdAt: new Date(),
          updatedAt: new Date()
         }], {});
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
