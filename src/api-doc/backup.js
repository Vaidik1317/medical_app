/**
 * @swagger
 * components:
 *   schemas:
 *     BackupResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Full database backup completed successfully
 *         backupFile:
 *           type: string
 *           example: /backups/full_backup_2025-10-15T10-32-20-123Z.sql
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         error:
 *           type: string
 *
 * /api/backup/full:
 *   post:
 *     summary: Perform a full PostgreSQL database backup
 *     description: Creates a complete `.sql` dump file of the entire database and stores it in the `/backups` folder.
 *     tags: [Backup]
 *     responses:
 *       200:
 *         description: Full database backup completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BackupResponse'
 *       500:
 *         description: Backup failed or internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /api/backup/{tableName}:
 *   post:
 *     summary: Perform a table-specific PostgreSQL backup
 *     description: Creates a `.sql` dump file for a specific table in the database.
 *     tags: [Backup]
 *     parameters:
 *       - in: path
 *         name: tableName
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the table to back up
 *     responses:
 *       200:
 *         description: Table backup completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BackupResponse'
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
