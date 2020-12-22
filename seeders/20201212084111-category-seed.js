'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      {
        category: 'Fiction',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 'Educational',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 'Religious',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 'Motivation',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {})
  }
};
