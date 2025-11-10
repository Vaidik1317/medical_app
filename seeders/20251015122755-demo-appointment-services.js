'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Get existing appointment and service IDs
    const appointments = await queryInterface.sequelize.query(`SELECT id FROM appointments;`);
    const generalServices = await queryInterface.sequelize.query(`SELECT id FROM general_services;`);
    const doctorServices = await queryInterface.sequelize.query(`SELECT id FROM doctor_services;`);

    const appointmentRows = appointments[0];
    const generalServiceRows = generalServices[0];
    const doctorServiceRows = doctorServices[0];

    if (!appointmentRows || appointmentRows.length === 0) {
      throw new Error('No appointments found');
    }
    if (!generalServiceRows || generalServiceRows.length === 0) {
      throw new Error('No general services found');
    }
    if (!doctorServiceRows || doctorServiceRows.length === 0) {
      throw new Error('No doctor services found');
    }

    await queryInterface.bulkInsert('appointment_services', [
      {
        id: uuidv4(),
        appointment_id: appointmentRows[0].id,
        general_service_id: generalServiceRows[0].id, // General Consultation
        quantity: 1,
      },
      {
        id: uuidv4(),
        appointment_id: appointmentRows[0].id,
        general_service_id: generalServiceRows[1].id, // Blood Test
        quantity: 2,
      },
      {
        id: uuidv4(),
        appointment_id: appointmentRows[1].id,
        general_service_id: generalServiceRows[2].id, // X-Ray
        quantity: 1,
      },
      {
        id: uuidv4(),
        appointment_id: appointmentRows[1].id,
        doctor_service_id: doctorServiceRows[0].id, // Cardiac Consultation
        quantity: 1,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('appointment_services', null, {});
  },
};
