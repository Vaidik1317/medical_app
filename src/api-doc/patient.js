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
 *           description: Hashed password (not returned in responses)
 *       example:
 *         id: "a3f1c2d0-1b4e-4c9f-8f3d-123456789abc"
 *         name: "Jane Doe"
 *         dob: "1990-05-15"
 *         contact: "+1234567890"
 *         email: "jane@example.com"
 *
 *     LoginResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Login successful
 *         token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *
 * /api/patient:
 *   get:
 *     summary: Get all patients
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Something went wrong
 *
 *   post:
 *     summary: Register a new patient
 *     tags: [Patients]
 *     description: Creates a new patient account with a hashed password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - contact
 *               - email
 *               - password
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
 *                 example: "9876543210"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 example: "mypassword123"
 *     responses:
 *       201:
 *         description: Patient created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       400:
 *         description: Email already registered or missing fields
 *       500:
 *         description: Something went wrong
 *
 * /api/patient/login:
 *   post:
 *     summary: Patient login
 *     tags: [Patients]
 *     description: Authenticates a patient and returns a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 example: "mypassword123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Patient not found
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Something went wrong
 *
 * /api/patient/staff:
 *   post:
 *     summary: Create patient by staff
 *     tags: [Patients]
 *     description: Staff members can create a patient record without a password.
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
 *                 example: "Alice Smith"
 *               dob:
 *                 type: string
 *                 format: date
 *                 example: "1992-01-01"
 *               contact:
 *                 type: string
 *                 example: "1112223333"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "alice@example.com"
 *     responses:
 *       201:
 *         description: Patient created by staff successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
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
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: Patient ID
 *     responses:
 *       200:
 *         description: Patient data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
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
 *         schema:
 *           type: string
 *           format: uuid
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
 *                 example: "Updated Name"
 *               dob:
 *                 type: string
 *                 format: date
 *                 example: "1991-09-01"
 *               contact:
 *                 type: string
 *                 example: "5556667777"
 *     responses:
 *       200:
 *         description: Patient updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
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
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
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
 *
 * securitySchemes:
 *   bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 */
