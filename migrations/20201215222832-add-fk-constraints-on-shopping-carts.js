'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('ShoppingCarts', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'fk_userId',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    await queryInterface.addConstraint('ShoppingCarts', {
      fields: ['ProductId'],
      type: 'foreign key',
      name: 'fk_productId',
      references: {
        table: 'Products',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('ShoppingCarts', 'fk_userId', {})
    await queryInterface.removeConstraint('ShoppingCarts', 'fk_productId', {})
  }
};
