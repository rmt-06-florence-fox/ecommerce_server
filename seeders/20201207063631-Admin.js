'use strict';
const bcrypt = require('bcryptjs')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let salt = bcrypt.genSaltSync(8)
    let password = bcrypt.hashSync("123456", salt)
    await queryInterface.bulkInsert('Users', [{email : "admin@mail.com", password, role : "admin", createdAt : new Date(), updatedAt : new Date()}] , {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
