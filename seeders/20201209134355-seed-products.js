'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = require('../seedingData/products.json')
    data.forEach(d => {
      d.createdAt = new Date()
      d.updatedAt = new Date()
    })

    try {
      await queryInterface.bulkInsert("Products", data, {}, {})

    } catch (err) {
      console.log(err)
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete('Products', null)

    } catch (err) {
      console.log(err)

    }
  }
};
