/**
 * @swagger
 * components:
 *   schemas:
 *     Service:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         cost:
 *           type: number
 *       example:
 *         id: 1
 *         name: Blood Test
 *         cost: 50.5
 *
 * /api/service:
 *   get:
 *     summary: Get all services
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: List of services
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 service:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Service'
 *       500:
 *         description: Something went wrong
 *
 *   post:
 *     summary: Create a service
 *     tags: [Services]
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
 *     responses:
 *       201:
 *         description: Service created
 *       500:
 *         description: Something went wrong
 *
 * /api/service/{id}:
 *   get:
 *     summary: Get service by ID
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Service details
 *       404:
 *         description: Service not found
 *       500:
 *         description: Something went wrong
 *
 *   put:
 *     summary: Update a service
 *     tags: [Services]
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
 *     responses:
 *       200:
 *         description: Service updated
 *       404:
 *         description: Service not found
 *       500:
 *         description: Something went wrong
 *
 *   delete:
 *     summary: Delete a service
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Service deleted
 *       404:
 *         description: Service not found
 *       500:
 *         description: Something went wrong
 */
