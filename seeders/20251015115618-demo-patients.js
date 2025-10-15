'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('patients', [
      {
        id: uuidv4(),
        name: 'John Doe',
        dob: '1985-06-15',
        contact: '1234567890',
        email: 'john.doe@example.com',
        password: 'hashedpassword1',
      },
      {
        id: uuidv4(),
        name: 'Jane Smith',
        dob: '1990-09-22',
        contact: '0987654321',
        email: 'jane.smith@example.com',
        password: 'hashedpassword2',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('patients', null, {});
  },
};
