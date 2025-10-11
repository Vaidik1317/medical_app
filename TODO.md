# TODO: Fixing Mistakes in Medical App Backend

## Plan Breakdown
1. [ ] Fix Controllers:
   - [x] appointmentController.js: Correct import for Appointment.
   - [x] serviceController.js: Add response in getServiceById; fix service_id to req.params.id in updateService and deleteService; fix destroy call.
   - [x] patientController.js: Fix destructuring in getPatientById, updatePatient, deletePatient; add response in deletePatient.
   - [x] doctorController.js: Fix getAllDoctor to return all; add createDoctor function.

2. [ ] Fix Routes:
   - [x] doctorRoutes.js: Fix destructuring.
   - [x] serviceRoutes.js: Fix route path typo.

3. [x] Fix API Documentation:
   - [x] Update all api-doc files: Change ID types to string (UUID).
   - [x] appointment.js: Add PUT for cancel.
   - [x] bill.js: Add PUT for mark paid.
   - [x] doctor.js: Remove POST documentation.
   - [x] service.js: Fix response schema.

4. [x] Fix Server.js: Rename startSrver to startServer.

5. [ ] Followup: Run server, test endpoints.

Progress: Starting implementation.
