'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('services', [
      { id: uuidv4(), name: 'General Consultation', cost: 50.00 },
      { id: uuidv4(), name: 'Blood Test', cost: 25.00 },
      { id: uuidv4(), name: 'X-Ray', cost: 100.00 },
      { id: uuidv4(), name: 'ECG', cost: 80.00 },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('services', null, {});
  },
};
