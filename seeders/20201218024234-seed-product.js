'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const productList = require("../products.json")

    productList.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    return queryInterface.bulkInsert('Products', productList, {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {})
  }
};
