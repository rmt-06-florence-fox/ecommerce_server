'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Carts', {
      fields: ['ProductId'],
      type: 'foreign key',
      name: 'add-product-fk-to-cart',
      references: {
        table: 'Products',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeConstraint('Carts', 'add-product-fk-to-cart')
  }
};