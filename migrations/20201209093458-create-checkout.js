'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Checkouts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productId: {
        type: Sequelize.INTEGER,
        references : {
          model : "Products",
          key : "id"
        },
        onUpdate : 'cascade',
        onDelete : 'cascade'
      },
      userId: {
        type: Sequelize.INTEGER,
        references : {
          model : "Users",
          key : "id"
        },
        onUpdate : 'cascade',
        onDelete : 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Checkouts');
  }
};