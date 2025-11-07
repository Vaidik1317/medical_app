# TODO: Implement Services in Appointment Creation and Auto-Generate Bills

## Steps to Complete

- [x] Update `createAppointment` in `src/controllers/appointmentController.js` to accept `services` array, use `Appointment.create` instead of stored procedure, and create `AppointmentService` entries for each service.
- [ ] Update `generateBill` in `src/controllers/billController.js` to make `service_ids` and `quantities` optional; if not provided, fetch from appointment's services.
- [ ] Test creating an appointment with services.
- [ ] Test generating a bill without providing services (auto-fetch from appointment).
