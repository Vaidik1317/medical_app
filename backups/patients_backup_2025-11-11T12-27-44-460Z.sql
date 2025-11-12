--
-- PostgreSQL database dump
--

\restrict CJlaZz45F9bjYefqANQNVYPlAShlJuum6plujvUOhnFvIcxWQ3aqpt856ZxhXn2

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: patients; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.patients (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    dob date,
    contact text,
    email text,
    password text
);


--
-- Data for Name: patients; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.patients (id, name, dob, contact, email, password) FROM stdin;
18421ee6-5605-46f8-beed-0d582547fcd7	John Doe	1985-06-15	1234567890	john.doe@example.com	hashedpassword1
b9dbb011-a3e5-47a7-86e1-34f8f00e8a73	Jane Smith	1990-09-22	0987654321	jane.smith@example.com	hashedpassword2
53ef2243-af77-4841-898c-f053644e8778	John Doe	1985-06-15	1234567890	john.doe@example.com	hashedpassword1
25f34542-0a67-4fc6-a644-a08ea7c6bc51	Jane Smith	1990-09-22	0987654321	jane.smith@example.com	hashedpassword2
4088cab6-0623-4128-a13f-803be2899865	narayan	2025-11-08	01234567890	\N	\N
29046f9d-b92a-41de-934e-1f33a01dfa36	vaidik	2025-11-08	01234567890	vaidik.bbcspl@gmail.com	$2b$10$yWIxzFrTiBiEjOFvsL53GOCCpZIHo3dtMaqesJr1uD3AUDi0FMnHG
01b0ffbf-899a-479e-bb62-b870334ccae9	John Doe	1985-06-15	1234567890	john.doe@example.com	hashedpassword1
a0a296d2-0743-45d1-bc6c-4307f12e2118	Jane Smith	1990-09-22	0987654321	jane.smith@example.com	hashedpassword2
\.


--
-- Name: patients patients_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict CJlaZz45F9bjYefqANQNVYPlAShlJuum6plujvUOhnFvIcxWQ3aqpt856ZxhXn2

