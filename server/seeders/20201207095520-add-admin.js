"use strict";
require("dotenv").config();
const { hash } = require("../helpers/bcrypt-helper");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let hashedAdmin = hash(process.env.ADMIN_PASS);
    let hashedCustomer = hash(process.env.CUST_PASS);
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "admin@user.com",
          password: hashedAdmin,
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "johncena@wwe.com",
          password: hashedCustomer,
          role: "customer",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
