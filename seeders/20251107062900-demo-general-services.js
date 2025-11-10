'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('general_services', [
      {
        id: uuidv4(),
        name: 'General Consultation',
        cost: 50.00,
        category: 'Consultation'
      },
      {
        id: uuidv4(),
        name: 'Blood Test',
        cost: 25.00,
        category: 'Laboratory'
      },
      {
        id: uuidv4(),
        name: 'X-Ray',
        cost: 100.00,
        category: 'Radiology'
      },
      {
        id: uuidv4(),
        name: 'ECG',
        cost: 80.00,
        category: 'Cardiology'
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('general_services', null, {});
  },
};
