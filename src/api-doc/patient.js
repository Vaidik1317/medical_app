/**
 * @swagger
 * components:
 *   schemas:
 *     Patient:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         dob:
 *           type: string
 *           format: date
 *         contact:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *       example:
 *         id: "a3f1c2d0-1b4e-4c9f-8f3d-123456789abc"
 *         name: "Jane Doe"
 *         dob: "1990-05-15"
 *         contact: "+1234567890"
 *         email: "jane@example.com"
 *         password: "hashedpassword"
 *
 * /api/patient:
 *   get:
 *     summary: Get all patients
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: List of patients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Patient'
 *       500:
 *         description: Something went wrong
 *
 *   post:
 *     summary: Create a new patient
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - contact
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               dob:
 *                 type: string
 *                 format: date
 *                 example: "1990-05-15"
 *               contact:
 *                 type: string
 *                 example: "1234567890"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: Patient created successfully
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/Patient'
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Something went wrong
 *
 * /api/patient/staff:
 *   post:
 *     summary: Create a patient by staff
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - contact
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Jane Doe"
 *               dob:
 *                 type: string
 *                 format: date
 *                 example: "1985-03-20"
 *               contact:
 *                 type: string
 *                 example: "0987654321"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "jane@example.com"
 *     responses:
 *       201:
 *         description: Patient created by staff successfully
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/Patient'
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Something went wrong
 *
 * /api/patient/{id}:
 *   get:
 *     summary: Get patient by ID
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Patient ID
 *     responses:
 *       200:
 *         description: Patient data
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/Patient'
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Something went wrong
 *
 *   put:
 *     summary: Update a patient
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Patient ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Name"
 *               dob:
 *                 type: string
 *                 format: date
 *                 example: "1990-05-15"
 *               contact:
 *                 type: string
 *                 example: "1112223333"
 *     responses:
 *       200:
 *         description: Patient updated
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/Patient'
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Something went wrong
 *
 *   delete:
 *     summary: Delete a patient
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Patient ID
 *     responses:
 *       200:
 *         description: Patient deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Patient deleted
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Something went wrong
 */
