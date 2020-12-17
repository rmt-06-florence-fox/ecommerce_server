'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      {
        name: "Mouse",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Keyboard",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Mousepad",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Headset",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
