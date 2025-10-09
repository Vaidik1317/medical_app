CREATE OR REPLACE PROCEDURE mark_bill_paid(
    p_bill_id UUID
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE bills
    SET paid = TRUE
    WHERE id = p_bill_id;
END;
$$;
