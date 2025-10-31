/**
 * @swagger
 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Internal server error
 *         error:
 *           type: string
 *           example: Backup process failed
 *
 * /api/backup/full:
 *   get:
 *     summary: Download a full PostgreSQL database backup
 *     description: |
 *       Generates a complete `.sql` dump file of your Supabase PostgreSQL database and returns it as a downloadable file.
 *       This operation uses the `pg_dump` utility internally to back up all tables, views, and schema objects.
 *     tags: [Backup]
 *     responses:
 *       200:
 *         description: Full database backup completed successfully (file download)
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Backup failed or internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /api/backup/{tableName}:
 *   get:
 *     summary: Download a specific table backup
 *     description: |
 *       Generates a `.sql` dump file for a specific table in your Supabase PostgreSQL database and returns it as a downloadable file.
 *       Each request creates a fresh backup using the `pg_dump --table` command.
 *     tags: [Backup]
 *     parameters:
 *       - in: path
 *         name: tableName
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the table to back up (case-sensitive)
 *     responses:
 *       200:
 *         description: Table backup completed successfully (file download)
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Table name is missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Table backup failed or internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
