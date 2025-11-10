'use strict';

const { Sequelize } = require("sequelize");

module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.createTable("bill_items", {
         id : {
            type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        bill_id: {
            type: Sequelize.UUID,
            allowNull: false,
                    references: { model: 'bills', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        },
        doctor_service_id: {
            type: Sequelize.UUID,
            allowNull: true,
              references: { model: 'doctor_services', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        },
        general_service_id: {
            type: Sequelize.UUID,
            allowNull: true,
              references: { model: 'general_services', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        },
        quantity : {
            type: Sequelize.INTEGER,
            defaultValue: 1,

        },

        unit_price :{
            type: Sequelize.DECIMAL(12,2),
            allowNull: false
        }
    })
  },

  down: async(queryInterface) => {
    await queryInterface.dropTable('bill_items')
  }
}
