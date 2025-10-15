'use strict';

const { Sequelize } = require("sequelize");



module.exports = {
  up: async (queryInterface , Sequelize) => {
    await queryInterface.createTable("services", {
       id:{
            type:Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,

        },
        cost: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: false
        }
    })
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('services')
  }
}
