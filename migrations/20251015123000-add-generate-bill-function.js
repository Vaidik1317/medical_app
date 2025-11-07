'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION generate_bill(
          p_appointment_id UUID
      )
      RETURNS UUID
      LANGUAGE plpgsql
      AS $$
      DECLARE
        total NUMERIC := 0;
        rec RECORD;
        new_bill_id UUID;
        p_patient_id UUID;
      BEGIN
        -- Get patient_id from appointment
        SELECT patient_id INTO p_patient_id
        FROM appointments
        WHERE id = p_appointment_id;

        -- Create the bill
        INSERT INTO bills (appointment_id, patient_id, total_amount, tax, discount, paid)
        VALUES (p_appointment_id, p_patient_id, 0, 0, 0, false)
        RETURNING id INTO new_bill_id;

        -- Loop through all services linked to this appointment
        FOR rec IN
          SELECT service_id, quantity
          FROM appointment_services
          WHERE appointment_id = p_appointment_id
        LOOP
          INSERT INTO bill_items (bill_id, service_id, quantity, unit_price)
          SELECT new_bill_id, rec.service_id, rec.quantity, s.cost
          FROM services s
          WHERE s.id = rec.service_id;

          total := total + (rec.quantity * (SELECT cost FROM services WHERE id = rec.service_id));
        END LOOP;

        -- Update bill totals
        UPDATE bills
        SET total_amount = total, tax = total * 0.05
        WHERE id = new_bill_id;

        RETURN new_bill_id;
      END;
      $$;
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP FUNCTION IF EXISTS generate_bill(UUID);
    `);
  },
};
