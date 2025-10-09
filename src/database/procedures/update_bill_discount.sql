CREATE OR REPLACE PROCEDURE update_bill_discount(
    p_bill_id UUID,
    p_discount NUMERIC,
    p_tax_rate NUMERIC DEFAULT 0.10
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_total NUMERIC;
BEGIN
    -- Total before discount
    SELECT COALESCE(SUM(line_total),0) INTO v_total
    FROM bill_items
    WHERE bill_id = p_bill_id;

    -- Update bill
    UPDATE bills
    SET discount = p_discount,
        total_amount = v_total - p_discount,
        tax = (v_total - p_discount) * p_tax_rate
    WHERE id = p_bill_id;
END;
$$;
