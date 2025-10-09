CREATE OR REPLACE PROCEDURE schedule_appointment(
    p_patient_id TEXT,
    p_doctor_id TEXT,
    p_start TIMESTAMPTZ,
    p_end TIMESTAMPTZ
)

LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO appointments (
    patient_id,
    doctor_id,
    start_time,
    end_time,
    appointments_tsrange,
    status
  )

  VALUES(
    p_patient_id,
    p_doctor_id,
    p_start,
    p_end,
    TSTZRANGE(p_start, p_end),
    'Scheduled'
  );
END;
$$;
 