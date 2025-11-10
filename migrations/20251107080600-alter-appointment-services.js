'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Add new columns
    await queryInterface.addColumn('appointment_services', 'doctor_service_id', {
      type: Sequelize.UUID,
      allowNull: true,
      references: { model: 'doctor_services', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    await queryInterface.addColumn('appointment_services', 'general_service_id', {
      type: Sequelize.UUID,
      allowNull: true,
      references: { model: 'general_services', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    // Remove old service_id column
    await queryInterface.removeColumn('appointment_services', 'service_id');
  },

  async down(queryInterface, Sequelize) {
    // Add back service_id column
    await queryInterface.addColumn('appointment_services', 'service_id', {
      type: Sequelize.UUID,
      allowNull: false,
      references: { model: 'services', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    // Remove new columns
    await queryInterface.removeColumn('appointment_services', 'doctor_service_id');
    await queryInterface.removeColumn('appointment_services', 'general_service_id');
  },
};
