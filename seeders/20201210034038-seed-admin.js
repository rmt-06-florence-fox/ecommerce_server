'use strict';
let bcrypt = require("bcryptjs")
let salt = bcrypt.genSaltSync(10);
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
   await queryInterface.bulkInsert('Admins', [
     {
       email: "admin@mail.com",
       password: bcrypt.hashSync("1234", salt),
       role: "admin",
       createdAt: new Date(),
       updatedAt: new Date()
     }], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Admins', null, {})
  }
};
