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
 *     summary: Schedule a new appointment
 *     tags: [Appointments]
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
 *               doctor_id:
 *                 type: string
 *               start_time:
 *                 type: string
 *                 format: date-time
 *               end_time:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Appointment scheduled successfully
 *       500:
 *         description: Something went wrong
 *
 *
 * /api/appointment/{id}:
 *   put:
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
 */
