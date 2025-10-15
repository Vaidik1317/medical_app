'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Get existing appointment and service IDs
    const appointments = await queryInterface.sequelize.query(`SELECT id FROM appointments;`);
    const services = await queryInterface.sequelize.query(`SELECT id FROM services;`);

    const appointmentRows = appointments[0];
    const serviceRows = services[0];

    await queryInterface.bulkInsert('appointment_services', [
      {
        id: uuidv4(),
        appointment_id: appointmentRows[0].id,
        service_id: serviceRows[0].id, // General Consultation
        quantity: 1,
      },
      {
        id: uuidv4(),
        appointment_id: appointmentRows[0].id,
        service_id: serviceRows[1].id, // Blood Test
        quantity: 2,
      },
      {
        id: uuidv4(),
        appointment_id: appointmentRows[1].id,
        service_id: serviceRows[2].id, // X-Ray
        quantity: 1,
      },
      {
        id: uuidv4(),
        appointment_id: appointmentRows[1].id,
        service_id: serviceRows[3].id, // ECG
        quantity: 1,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('appointment_services', null, {});
  },
};
