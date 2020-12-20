'use strict';
const Helper = require('../helpers') 

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = require('../seedingData/users.json')
    data.forEach(d => {
      d.createdAt = new Date()
      d.updatedAt = new Date()
      d.password = Helper.hash(d.password)
    })

    try{
    await queryInterface.bulkInsert("Users", data, {}, {})

    } catch (err){
      console.log(err)
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete('Users', null)

    } catch(err){
      console.log(err)
    
    }
  }
};
