const {exec} = require('child_process');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const backupFullDatabase = async (req, res) => {
    try {
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
          const backupDir = path.join(__dirname, '../../backups');
          if(!fs.existsSync(backupDir)) fs.mkdirSync(backupDir);

          const backupFile = path.join(backupDir, `full_backup_${timestamp}.sql`);

          const cmd = `pg_dump -d "${process.env.DATABASE_URL}" --no-owner --no-privileges > "${backupFile}"`;

          const env = { ...process.env, PATH: `C:\\Program Files\\PostgreSQL\\17\\bin;${process.env.PATH}` };
          exec(cmd, { shell: 'powershell.exe', env }, (error) => {
            if(error)
            {
                console.error('Backup failed:', error)

                return res.status(500).json({ message: 'Backup failed', error: error.message});
            }
            console.log(`Database backup completed: ${backupFile}`);
            res.status(200).json( {
                message: 'Full database backup completed successfully',
                backupFile: `backup/full_backup_${timestamp}.sql`,
            });
          });
    } catch (error) {
        console.log("🚀 ~ backupFullDatabase ~ error:", error)
        res.status(500).json({message: 'Internal server error'})

    }

}

const backupTable = async (req, res) => {
    try {
        const { tableName } = req.params;
        if(!tableName) return res.status(400).json({message: 'Table name required'})

            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const backupDir = path.join(__dirname, '../../backups');

            if(!fs.existsSync(backupDir)) fs.mkdirSync(backupDir);

            const backupFile = path.join(backupDir, `${tableName}_backup_${timestamp}.sql`)

              const cmd = `pg_dump -d "${process.env.DATABASE_URL}" --table=${tableName} --no-owner --no-privileges > "${backupFile}"`;

      const env = { ...process.env, PATH: `C:\\Program Files\\PostgreSQL\\17\\bin;${process.env.PATH}` };
      exec(cmd, { shell: 'powershell.exe', env }, (error) => {
        if(error) {
            console.error('Table backup failed:', error)
             return res.status(500).json({ message: 'Table backup failed', error: error.message });
        }
        console.log(`Backup completed for table: ${tableName}`);
        res.status(200).json({
            message: `Backup complete for table: ${tableName}`,
             backupFile: `/backups/${tableName}_backup_${timestamp}.sql`,
        })
      })
    } catch (error) {
            console.error('🚨 Error during table backup:', err);
    res.status(500).json({ message: 'Internal server error' });

    }

}

module.exports.backupController = {backupFullDatabase, backupTable}