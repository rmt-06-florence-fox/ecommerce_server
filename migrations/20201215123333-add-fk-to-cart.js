'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Carts", "UserId", {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Users"
          },
          key: "id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }),
      queryInterface.addColumn("Carts", "ProductId", {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Products"
          },
          key: "id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
    ])
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn("Carts", "UserId"), queryInterface.removeColumn("Carts", "ProductId")])
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
