'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    const appointments = await queryInterface.sequelize.query(`SELECT id, patient_id FROM appointments;`);
    const appointmentRows = appointments[0];

    await queryInterface.bulkInsert('bills', [
      {
        id: uuidv4(),
        appointment_id: appointmentRows[0].id,
        patient_id: appointmentRows[0].patient_id,
        total_amount: 75.00,
        tax: 5.00,
        discount: 0,
        paid: false,
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        appointment_id: appointmentRows[1].id,
        patient_id: appointmentRows[1].patient_id,
        total_amount: 125.00,
        tax: 10.00,
        discount: 5.00,
        paid: false,
        created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bills', null, {});
  },
};
