CREATE OR REPLACE PROCEDURE cancel_appointment(
    p_appointment_id TEXT
)

LANGUAGE plpgsql
AS $$ 
BEGIN
   UPDATE appointments
   SET status = 'Cancelled'
   WHERE id = p_appointment_id;

  UPDATE bills
  SET paid = FALSE
  WHERE appointment_id = p_appointment_id;
END;
$$;
 