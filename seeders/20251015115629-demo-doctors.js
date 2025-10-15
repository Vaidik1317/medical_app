'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('doctors', [
      {
        id: uuidv4(),
        name: 'Dr. Alice Brown',
        specialization: 'Cardiology',
        contact: '1112223333',
      },
      {
        id: uuidv4(),
        name: 'Dr. Bob Green',
        specialization: 'Dermatology',
        contact: '4445556666',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('doctors', null, {});
  },
};
