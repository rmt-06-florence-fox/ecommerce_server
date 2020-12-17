'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      {
        id: 1,
        name: "Mouse",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: "Keyboard",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: "Mousepad",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
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
