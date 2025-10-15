"use strict";

const { Sequelize } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("doctors", {
         id: {
            type: Sequelize.UUID,
            defaultValue : Sequelize.UUIDV4,
            primaryKey: true 
        },

        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        specialization: {
            type: Sequelize.STRING,
           
        },
        contact: {
             type: Sequelize.STRING,
            allowNull: false
        }
    })

  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('doctors')
  }

};