'use strict';
var bcrypt = require('bcryptjs');
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
    
    var hash = bcrypt.hashSync("qwerty", 10);
    let data = {
     email: "admin@mail.com",
     password: hash,
     role: "admin",
     createdAt: new Date(),
     updatedAt: new Date()
    }

    return queryInterface.bulkInsert('Users', data, {})
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
