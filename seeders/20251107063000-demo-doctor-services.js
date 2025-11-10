'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    // First, get the doctor IDs from the database
    const doctors = await queryInterface.sequelize.query(
      'SELECT id, name FROM doctors;',
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (doctors.length === 0) {
      console.log('No doctors found. Please run demo-doctors seeder first.');
      return;
    }

    const doctor1 = doctors.find(d => d.name === 'Dr. Alice Brown');
    const doctor2 = doctors.find(d => d.name === 'Dr. Bob Green');

    if (!doctor1 || !doctor2) {
      console.log('Required doctors not found. Please ensure demo-doctors seeder has been run.');
      return;
    }

    await queryInterface.bulkInsert('doctor_services', [
      {
        id: uuidv4(),
        doctor_id: doctor1.id,
        name: 'Cardiac Consultation',
        cost: 150.00
      },
      {
        id: uuidv4(),
        doctor_id: doctor1.id,
        name: 'Echocardiogram',
        cost: 200.00
      },
      {
        id: uuidv4(),
        doctor_id: doctor2.id,
        name: 'Skin Biopsy',
        cost: 120.00
      },
      {
        id: uuidv4(),
        doctor_id: doctor2.id,
        name: 'Dermatology Checkup',
        cost: 100.00
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('doctor_services', null, {});
  },
};
