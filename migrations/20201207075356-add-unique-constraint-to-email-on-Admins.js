'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.addConstraint('Admins', {
      fields: ['email'],
      type: 'unique',
      name: 'add-unique-constraint-to-email-on-Admins'
  });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('Admins', 'add-unique-constraint-to-email-on-Admins', {})
  }
};
