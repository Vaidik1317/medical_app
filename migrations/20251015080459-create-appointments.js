'use strict';



module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("appointments" , {
        id: {
            type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        patient_id: {
            type: Sequelize.UUID,
            allowNull:false,
            references: { model: 'patients', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',

        },
        doctor_id: {
            type: Sequelize.UUID,
            allowNull: false,
             references: { model: 'doctors', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        },
        start_time : {
            type: Sequelize.DATE,
            allowNull: false
        }, 
        end_time: {
            type: Sequelize.DATE,
            allowNull: false
        },
        appointments_tsrange:{
            type: Sequelize.RANGE(Sequelize.DATE),
            allowNull:false
        },
        status:{
            type: Sequelize.STRING,
            defaultValue: 'Scheduled'
        }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("appointments")
  }
};