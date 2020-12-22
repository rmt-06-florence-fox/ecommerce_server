'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Carts', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'custom_user',
      references: { //Required field
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
      .then(() => {
        return queryInterface.addConstraint('Carts', {
          fields: ['ProductId'],
          type: 'foreign key',
          name: 'custom_product',
          references: { //Required field
            table: 'Products',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        })
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Carts', 'custom_user', {})
      .then(() => {
        return queryInterface.removeConstraint('Carts', 'custom_product', {})
      })
  }
};
