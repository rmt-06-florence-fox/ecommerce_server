"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Carts", {
      fields: ["UserId"],
      type: "foreign key",
      name: "add-user-fk-to-cart",
      references: {
        table: "Users",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("Carts", "add-user-fk-to-cart");
  },
};
