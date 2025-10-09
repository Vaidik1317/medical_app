CREATE OR REPLACE FUNCTION get_doctor_schedule(p_doctor_id TEXT)
RETURNS TABLE(
    appointment_id TEXT,
    patient_name TEXT,
    start_time TIMESTAMPTZ,
    end_time TIMESTAMPTZ,
    status TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT a.id, p.name, a.start_time, a.end_time, a.status
    FROM appointments a
    JOIN patients p ON a.patient_id = p.id
    WHERE a.doctor_id = p_doctor_id
    ORDER BY a.start_time;
END;
$$;
 