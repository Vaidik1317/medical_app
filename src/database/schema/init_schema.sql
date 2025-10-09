-- =============================
-- 🚀 Medical App Database Schema
-- =============================

-- Drop existing tables (optional for development)
DROP TABLE IF EXISTS bill_items CASCADE;
DROP TABLE IF EXISTS bills CASCADE;
DROP TABLE IF EXISTS appointment_services CASCADE;
DROP TABLE IF EXISTS appointments CASCADE;
DROP TABLE IF EXISTS patients CASCADE;
DROP TABLE IF EXISTS doctors CASCADE;
DROP TABLE IF EXISTS services CASCADE;

-- =============================
-- 🧑‍⚕️ Patients Table
-- =============================
CREATE TABLE patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    dob DATE,
    contact TEXT
);

-- =============================
-- 👨‍⚕️ Doctors Table
-- =============================
CREATE TABLE doctors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    specialization TEXT,
    contact TEXT
);

-- =============================
-- 💊 Services Table
-- =============================
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    cost NUMERIC(10,2) NOT NULL
);

-- =============================
-- 📅 Appointments Table
-- =============================
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    appointments_tsrange TSTZRANGE GENERATED ALWAYS AS (TSTZRANGE(start_time, end_time)) STORED,
    status TEXT DEFAULT 'Scheduled'
);

-- =============================
-- 🔗 Appointment Services Table (many-to-many)
-- =============================
CREATE TABLE appointment_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id UUID REFERENCES appointments(id) ON DELETE CASCADE,
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    quantity INT DEFAULT 1
);

-- =============================
-- 💵 Bills Table
-- =============================
CREATE TABLE bills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id UUID REFERENCES appointments(id) ON DELETE CASCADE,
    total_amount NUMERIC(12,2) DEFAULT 0,
    tax NUMERIC(12,2) DEFAULT 0,
    discount NUMERIC(12,2) DEFAULT 0,
    paid BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================
-- 🧾 Bill Items Table
-- =============================
CREATE TABLE bill_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bill_id UUID REFERENCES bills(id) ON DELETE CASCADE,
    service_id UUID REFERENCES services(id),
    quantity INT DEFAULT 1,
    unit_price NUMERIC(12,2),
    line_total NUMERIC(12,2)
);

-- =============================
-- ✅ Indexes (optional but good practice)
-- =============================
CREATE INDEX idx_appointments_doctor_id ON appointments(doctor_id);
CREATE INDEX idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX idx_bill_items_bill_id ON bill_items(bill_id);

-- =============================
-- 🎉 Done
-- =============================
