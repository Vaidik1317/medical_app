/**
 * @swagger
 * components:
 *   schemas:
 *     GeneralService:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         cost:
 *           type: number
 *         category:
 *           type: string
 *       example:
 *         id: "550e8400-e29b-41d4-a716-446655440000"
 *         name: "Blood Test"
 *         cost: 25.00
 *         category: "Laboratory"
 *
 *     DoctorService:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         doctor_id:
 *           type: string
 *         name:
 *           type: string
 *         cost:
 *           type: number
 *       example:
 *         id: "550e8400-e29b-41d4-a716-446655440001"
 *         doctor_id: "550e8400-e29b-41d4-a716-446655440002"
 *         name: "Cardiac Consultation"
 *         cost: 150.00
 *
 * /api/general:
 *   get:
 *     summary: Get all general services
 *     tags: [General Services]
 *     responses:
 *       200:
 *         description: List of general services
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 services:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/GeneralService'
 *       500:
 *         description: Something went wrong
 *
 *   post:
 *     summary: Create a general service
 *     tags: [General Services]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - cost
 *             properties:
 *               name:
 *                 type: string
 *               cost:
 *                 type: number
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: General service created
 *       500:
 *         description: Something went wrong
 *
 * /api/general/{id}:
 *   get:
 *     summary: Get general service by ID
 *     tags: [General Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: General service details
 *       404:
 *         description: General service not found
 *       500:
 *         description: Something went wrong
 *
 *   put:
 *     summary: Update a general service
 *     tags: [General Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               cost:
 *                 type: number
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: General service updated
 *       404:
 *         description: General service not found
 *       500:
 *         description: Something went wrong
 *
 *   delete:
 *     summary: Delete a general service
 *     tags: [General Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: General service deleted
 *       404:
 *         description: General service not found
 *       500:
 *         description: Something went wrong
 *
 * /api/doctor-services/{doctorId}:
 *   get:
 *     summary: Get all doctor services for a specific doctor
 *     tags: [Doctor Services]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *     responses:
 *       200:
 *         description: List of doctor services
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DoctorService'
 *       500:
 *         description: Something went wrong
 *
 * /api/doctor-services:
 *   post:
 *     summary: Create a doctor service
 *     tags: [Doctor Services]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - doctor_id
 *               - name
 *               - cost
 *             properties:
 *               doctor_id:
 *                 type: string
 *               name:
 *                 type: string
 *               cost:
 *                 type: number
 *     responses:
 *       201:
 *         description: Doctor service created
 *       500:
 *         description: Something went wrong
 *
 * /api/available/{doctorId}:
 *   get:
 *     summary: Get all available services for a doctor
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *     responses:
 *       200:
 *         description: List of available services
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 doctor_services:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/DoctorService'
 *                 general_services:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/GeneralService'
 *       500:
 *         description: Something went wrong
 *
 */
