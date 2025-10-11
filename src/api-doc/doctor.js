/**
 * @swagger
 * components:
 *   schemas:
 *     Doctor:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Doctor ID
 *         name:
 *           type: string
 *           description: Doctor name
 *         specialization:
 *           type: string
 *           description: Area of specialization
 *         contact:
 *           type: string
 *           description: Contact number or email
 *       example:
 *         id: 1
 *         name: Dr. John Doe
 *         specialization: Cardiology
 *         contact: "+1234567890"
 *
 *     Schedule:
 *       type: object
 *       properties:
 *         day:
 *           type: string
 *         start_time:
 *           type: string
 *           format: date-time
 *         end_time:
 *           type: string
 *           format: date-time
 *       example:
 *         day: Monday
 *         start_time: "2025-10-10T09:00:00Z"
 *         end_time: "2025-10-10T17:00:00Z"
 *
 * /api/doctor:
 *   get:
 *     summary: Get all doctors
 *     tags: [Doctors]
 *     responses:
 *       200:
 *         description: List of doctors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Doctor'
 *       500:
 *         description: Something went wrong
 *
 *   post:
 *     summary: Create a new doctor
 *     tags: [Doctors]
 *     description: Adds a new doctor to the system with name, specialization, and contact details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - specialization
 *               - contact
 *             properties:
 *               name:
 *                 type: string
 *                 example: Dr. Jane Smith
 *               specialization:
 *                 type: string
 *                 example: Dermatology
 *               contact:
 *                 type: string
 *                 example: "+1987654321"
 *     responses:
 *       201:
 *         description: Doctor created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Doctor'
 *       500:
 *         description: Something went wrong
 *
 * /api/doctor/{id}:
 *   get:
 *     summary: Get doctor schedule by ID
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Doctor ID
 *     responses:
 *       200:
 *         description: Doctor's schedule
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Schedule'
 *       404:
 *         description: Doctor not found
 *       500:
 *         description: Something went wrong
 */
