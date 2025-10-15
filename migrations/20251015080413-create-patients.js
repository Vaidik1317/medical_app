"use strict";



module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("patients", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dob: {
        type: Sequelize.DATEONLY,

      },
      contact: {
        type: Sequelize.STRING,
    
      },
      email: {
        type: Sequelize.STRING,
     
        unique: true,
     
      },

      password: {
        type: Sequelize.STRING,
       
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('patients')
  }
};
