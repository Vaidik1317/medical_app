/**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       properties:
 *         appointment_id:
 *           type: string
 *         patient_id:
 *           type: string
 *         doctor_id:
 *           type: string
 *         start_time:
 *           type: string
 *           format: date-time
 *         end_time:
 *           type: string
 *           format: date-time
 *       example:
 *         appointment_id: 1
 *         patient_id: 10
 *         doctor_id: 5
 *         start_time: "2025-10-10T09:00:00Z"
 *         end_time: "2025-10-10T09:30:00Z"
 *
 *     AppointmentService:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         appointment_id:
 *           type: string
 *         service_id:
 *           type: string
 *         quantity:
 *           type: integer
 *           default: 1
 *       example:
 *         id: "uuid"
 *         appointment_id: "uuid"
 *         service_id: "uuid"
 *         quantity: 1
 *
 * /api/appointment:
 *   get:
 *     summary: Get all appointments
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: List of all appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 *       500:
 *         description: Something went wrong
 *
 *   post:
 *     summary: Schedule a new appointment (with optional services)
 *     tags: [Appointments]
 *     description: |
 *       Creates a new appointment for a patient with a doctor.  
 *       Optionally, you can include an array of services to be attached to this appointment.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - patient_id
 *               - doctor_id
 *               - start_time
 *               - end_time
 *             properties:
 *               patient_id:
 *                 type: string
 *                 example: "uuid-patient-123"
 *               doctor_id:
 *                 type: string
 *                 example: "uuid-doctor-456"
 *               start_time:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-10-15T09:00:00Z"
 *               end_time:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-10-15T09:30:00Z"
 *               services:
 *                 type: array
 *                 description: Optional list of services to add to this appointment
 *                 items:
 *                   type: object
 *                   properties:
 *                     service_id:
 *                       type: string
 *                       example: "uuid-service-789"
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Appointment scheduled successfully with optional services
 *         content:
 *           application/json:
 *             example:
 *               message: Appointment scheduled successfully with services
 *               appointment:
 *                 id: "uuid-appointment-001"
 *                 patient_id: "uuid-patient-123"
 *                 doctor_id: "uuid-doctor-456"
 *                 start_time: "2025-10-15T09:00:00Z"
 *                 end_time: "2025-10-15T09:30:00Z"
 *                 status: "Scheduled"
 *       500:
 *         description: Something went wrong
 *         content:
 *           application/json:
 *             example:
 *               message: Something went wrong
 * /api/appointment/{id}:
 *   get:
 *     summary: Get appointments by patient ID
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Patient ID to get appointments for
 *     responses:
 *       200:
 *         description: List of patient's appointments with doctor and services details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 allOf:
 *                   - $ref: '#/components/schemas/Appointment'
 *                   - type: object
 *                     properties:
 *                       doctor:
 *                         type: object
 *                         description: Doctor details
 *                       services:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             service:
 *                               type: object
 *                               description: Service details
 *                             quantity:
 *                               type: integer
 *       500:
 *         description: Something went wrong
 *
 * /api/appointment/cancel/{id}:
 *   patch:
 *     summary: Cancel an appointment
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the appointment to cancel
 *     responses:
 *       200:
 *         description: Appointment cancelled successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Appointment cancelled
 *       404:
 *         description: Appointment not found
 *         content:
 *           application/json:
 *             example:
 *               message: Appointment not found
 *       500:
 *         description: Something went wrong
 *         content:
 *           application/json:
 *             example:
 *               message: something went wrong
 *
 * /api/appointment-service:
 *   get:
 *     summary: Get all appointment services
 *     tags: [AppointmentServices]
 *     responses:
 *       200:
 *         description: List of all appointment services
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AppointmentService'
 *       500:
 *         description: Something went wrong
 *
 *   post:
 *     summary: Create a new appointment service
 *     tags: [AppointmentServices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - appointment_id
 *               - service_id
 *             properties:
 *               appointment_id:
 *                 type: string
 *               service_id:
 *                 type: string
 *               quantity:
 *                 type: integer
 *                 default: 1
 *     responses:
 *       201:
 *         description: Appointment service created successfully
 *       500:
 *         description: Something went wrong
 *
 * /api/appointment-service/{id}:
 *   get:
 *     summary: Get appointment service by ID
 *     tags: [AppointmentServices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the appointment service
 *     responses:
 *       200:
 *         description: Appointment service details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppointmentService'
 *       404:
 *         description: Appointment service not found
 *       500:
 *         description: Something went wrong
 *
 *   put:
 *     summary: Update an appointment service
 *     tags: [AppointmentServices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the appointment service to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               appointment_id:
 *                 type: string
 *               service_id:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Appointment service updated successfully
 *       404:
 *         description: Appointment service not found
 *       500:
 *         description: Something went wrong
 *
 *   delete:
 *     summary: Delete an appointment service
 *     tags: [AppointmentServices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the appointment service to delete
 *     responses:
 *       200:
 *         description: Appointment service deleted successfully
 *       404:
 *         description: Appointment service not found
 *       500:
 *         description: Something went wrong
 */
/**
 * @swagger
 * /api/appointment/{id}/services:
 *   get:
 *     summary: Get all services for a specific appointment
 *     tags: [AppointmentServices]
 *     description: |
 *       Returns all services linked to a specific appointment ID.  
 *       Each service includes its details and assigned quantity.  
 *       If no services are found, a `404` error is returned.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the appointment to fetch associated services for
 *     responses:
 *       200:
 *         description: List of services associated with the appointment
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: AppointmentService record ID
 *                   appointment_id:
 *                     type: string
 *                     description: Appointment ID
 *                   service_id:
 *                     type: string
 *                     description: Service ID
 *                   quantity:
 *                     type: integer
 *                     description: Quantity of the service assigned
 *                     example: 1
 *                   service:
 *                     type: object
 *                     description: Details of the service
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                         example: "Dental Cleaning"
 *                       cost:
 *                         type: number
 *                         example: 50.0
 *       404:
 *         description: No services found for this appointment
 *         content:
 *           application/json:
 *             example:
 *               message: No services found for this appointment. Please add some first.
 *       500:
 *         description: Something went wrong
 *         content:
 *           application/json:
 *             example:
 *               message: Something went wrong
 */
