'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Get patient and doctor IDs for associations
    const patients = await queryInterface.sequelize.query(`SELECT id FROM patients;`);
    const doctors = await queryInterface.sequelize.query(`SELECT id FROM doctors;`);

    const patientRows = patients[0];
    const doctorRows = doctors[0];

    await queryInterface.bulkInsert('appointments', [
      {
        id: uuidv4(),
        patient_id: patientRows[0].id,
        doctor_id: doctorRows[0].id,
        start_time: new Date('2025-10-20T10:00:00Z'),
        end_time: new Date('2025-10-20T10:30:00Z'),
        status: 'Scheduled',
      },
      {
        id: uuidv4(),
        patient_id: patientRows[1].id,
        doctor_id: doctorRows[1].id,
        start_time: new Date('2025-10-21T11:00:00Z'),
        end_time: new Date('2025-10-21T11:30:00Z'),
        status: 'Scheduled',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('appointments', null, {});
  },
};
