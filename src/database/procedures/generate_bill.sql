CREATE OR REPLACE PROCEDURE generate_bill(
    p_appointment_id TEXT,
    p_service_ids TEXT[],
    p_quantities INT[],
    p_tax_rate NUMERIC DEFAULT 0.10 -- optional dynamic tax
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_bill_id TEXT;
    v_total NUMERIC(12,2) := 0;
    i INT; 
BEGIN
    -- 1️⃣ Insert services into appointment_services
    FOR i IN 1..array_length(p_service_ids,1) LOOP
        INSERT INTO appointment_services (appointment_id, service_id, quantity)
        VALUES (p_appointment_id, p_service_ids[i], p_quantities[i]);
    END LOOP;

    -- 2️⃣ Create bill
    INSERT INTO bills(appointment_id, total_amount)
    VALUES (p_appointment_id, 0)
    RETURNING id INTO v_bill_id;

    -- 3️⃣ Insert into bill_items from appointment_services
    INSERT INTO bill_items (bill_id, service_id, quantity, unit_price, line_total)
    SELECT
        v_bill_id,
        s.service_id,
        s.quantity,
        sv.cost,
        sv.cost * s.quantity
    FROM appointment_services s
    JOIN services sv ON s.service_id = sv.id
    WHERE s.appointment_id = p_appointment_id;

    -- 4️⃣ Calculate total
    SELECT COALESCE(SUM(line_total), 0) INTO v_total
    FROM bill_items
    WHERE bill_id = v_bill_id;

    -- 5️⃣ Update bill with total, tax, discount
    UPDATE bills
    SET total_amount = v_total,
        tax = v_total * p_tax_rate,
        discount = 0,
        paid = FALSE
    WHERE id = v_bill_id;
END;
$$;
