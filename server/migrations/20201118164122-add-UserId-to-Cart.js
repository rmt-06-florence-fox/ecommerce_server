'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Carts','UserId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Carts','UserId')
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
