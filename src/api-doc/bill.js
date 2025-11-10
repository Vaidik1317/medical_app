/**
 * @swagger
 * components:
 *   schemas:
 *     DoctorService:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         cost:
 *           type: number
 *       example:
 *         id: "550e8400-e29b-41d4-a716-446655440000"
 *         name: Consultation
 *         cost: 100.0
 *
 *     GeneralService:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         cost:
 *           type: number
 *       example:
 *         id: "550e8400-e29b-41d4-a716-446655440001"
 *         name: Blood Test
 *         cost: 50.5
 *
 *     BillItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         bill_id:
 *           type: string
 *         doctor_service_id:
 *           type: string
 *           nullable: true
 *         general_service_id:
 *           type: string
 *           nullable: true
 *         quantity:
 *           type: integer
 *         unit_price:
 *           type: number
 *         line_total:
 *           type: number
 *         doctorService:
 *           $ref: '#/components/schemas/DoctorService'
 *         generalService:
 *           $ref: '#/components/schemas/GeneralService'
 *       example:
 *         id: "550e8400-e29b-41d4-a716-446655440002"
 *         bill_id: "550e8400-e29b-41d4-a716-446655440003"
 *         doctor_service_id: "550e8400-e29b-41d4-a716-446655440000"
 *         general_service_id: null
 *         quantity: 2
 *         unit_price: 100.0
 *         line_total: 200.0
 *         doctorService:
 *           id: "550e8400-e29b-41d4-a716-446655440000"
 *           name: Consultation
 *           cost: 100.0
 *         generalService: null
 *
 *     Appointment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         patient_id:
 *           type: integer
 *         doctor_id:
 *           type: integer
 *         start_time:
 *           type: string
 *           format: date-time
 *         end_time:
 *           type: string
 *           format: date-time
 *       example:
 *         id: 10
 *         patient_id: 100
 *         doctor_id: 5
 *         start_time: "2025-10-10T09:00:00Z"
 *         end_time: "2025-10-10T09:30:00Z"
 *
 *     Bill:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         appointment_id:
 *           type: string
 *         total_amount:
 *           type: number
 *         tax:
 *           type: number
 *         discount:
 *           type: number
 *         paid:
 *           type: boolean
 *         created_at:
 *           type: string
 *           format: date-time
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/BillItem'
 *         appointment:
 *           $ref: '#/components/schemas/Appointment'
 *       example:
 *         id: 1
 *         appointment_id: 10
 *         total_amount: 500
 *         tax: 50
 *         discount: 20
 *         paid: false
 *         created_at: "2025-10-10T09:00:00Z"
 *         items:
 *           - id: 1
 *             bill_id: 1
 *             service_id: 5
 *             quantity: 2
 *             price: 150.5
 *             service:
 *               id: 5
 *               name: Blood Test
 *               cost: 50.5
 *         appointment:
 *           id: 10
 *           patient_id: 100
 *           doctor_id: 5
 *           start_time: "2025-10-10T09:00:00Z"
 *           end_time: "2025-10-10T09:30:00Z"
 *
 * /api/bill/patient/{patientId}:
 *   get:
 *     summary: Get all bills for a specific patient (with details)
 *     tags: [Bills]
 *     description: |
 *       Retrieves all bills for a given patient, including:
 *       - Bill items with service details
 *       - Associated appointment and doctor details
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient
 *     responses:
 *       200:
 *         description: List of bills for the patient
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bill'
 *       404:
 *         description: No bills found for the patient
 *         content:
 *           application/json:
 *             example:
 *               message: No bills found for this patient
 *       500:
 *         description: Something went wrong
 *         content:
 *           application/json:
 *             example:
 *               message: Something went wrong
 *
 * /api/bill/{id}:
 *   get:
 *     summary: Get a bill by ID
 *     tags: [Bills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bill ID
 *     responses:
 *       200:
 *         description: Bill details
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/Bill'
 *       404:
 *         description: Bill not found
 *         content:
 *           application/json:
 *             example:
 *               message: Bill not found
 *       500:
 *         description: Something went wrong
 *
 *   delete:
 *     summary: Delete a bill
 *     tags: [Bills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bill ID
 *     responses:
 *       200:
 *         description: Bill deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Bill deleted
 *       404:
 *         description: Bill not found
 *         content:
 *           application/json:
 *             example:
 *               message: Bill not found
 *       500:
 *         description: Something went wrong
 *
 * /api/bill:
 *   get:
 *     summary: Get all bills
 *     tags: [Bills]
 *     responses:
 *       200:
 *         description: List of all bills
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bill'
 *       500:
 *         description: Something went wrong
 *
 *   post:
 *     summary: Generate a new bill
 *     tags: [Bills]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - appointment_id
 *             properties:
 *               appointment_id:
 *                 type: string
 *                 example: "550e8400-e29b-41d4-a716-446655440004"
 *     responses:
 *       201:
 *         description: Bill generated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Bill generated successfully
 *       500:
 *         description: Something went wrong
 *
 * /api/bill/{id}/pay:
 *   patch:
 *     summary: Mark a bill as paid
 *     tags: [Bills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bill ID
 *     responses:
 *       200:
 *         description: Bill marked as paid successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Bill marked as paid successfully
 *       500:
 *         description: Something went wrong
 *
 * /api/bill/{id}/discount:
 *   patch:
 *     summary: Update bill discount
 *     tags: [Bills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bill ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               discount:
 *                 type: number
 *                 example: 50
 *     responses:
 *       200:
 *         description: Bill discount updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Bill discount updated successfully
 *       500:
 *         description: Something went wrong
 */
