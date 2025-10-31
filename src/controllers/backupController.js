const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

/**
 * Shared helper to run pg_dump and send the file
 */
async function createBackup(dumpArgs, fileName, res) {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = path.join(__dirname, '../../backups');
    if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });

    const backupFile = path.join(backupDir, `${fileName}_${timestamp}.sql`);
    const output = fs.createWriteStream(backupFile);

    // Run pg_dump safely
    const pgDump = spawn('pg_dump', dumpArgs);

    pgDump.stdout.pipe(output);
    pgDump.stderr.on('data', (data) => console.error(data.toString()));

    pgDump.on('exit', (code) => {
      if (code === 0) {
        console.log(`✅ Backup created: ${backupFile}`);
        res.download(backupFile, `${fileName}_${timestamp}.sql`, (err) => {
          if (err) console.error('Error sending file:', err);
          // Optional cleanup:
          // fs.unlinkSync(backupFile);
        });
      } else {
        console.error(`❌ Backup failed (exit code ${code})`);
        res.status(500).json({ message: 'Backup failed', code });
      }
    });
  } catch (err) {
    console.error('🚨 Error during backup:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * 🔹 Full database backup
 */
const backupFullDatabase = async (req, res) => {
  const dumpArgs = [
    `--dbname=${process.env.DATABASE_URL}`,
    '--no-owner',
    '--no-privileges',
  ];
  await createBackup(dumpArgs, 'full_backup', res);
};

/**
 * 🔹 Table-specific backup
 */
const backupTable = async (req, res) => {
  try {
    const { tableName } = req.params;

    // Basic input validation (avoid command injection)
    if (!tableName || !/^[a-zA-Z0-9_]+$/.test(tableName)) {
      return res.status(400).json({ message: 'Invalid table name' });
    }

    const dumpArgs = [
      `--dbname=${process.env.DATABASE_URL}`,
      `--table=${tableName}`,
      '--no-owner',
      '--no-privileges',
    ];

    await createBackup(dumpArgs, `${tableName}_backup`, res);
  } catch (err) {
    console.error('🚨 Error during table backup:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { backupFullDatabase, backupTable };
