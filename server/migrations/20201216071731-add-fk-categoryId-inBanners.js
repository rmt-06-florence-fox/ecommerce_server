'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
        'Banners', // name of Source model
        'CategoryId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Categories', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      );
    },
  
    down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn(
        'Banners', // name of Source model
        'CategoryId' // key we want to remove
      );
    }
};
