const express = require('express');
const router = express.Router();
const { backupFullDatabase, backupTable } = require('../controllers/backupController');

// Use GET so the browser / Swagger can download directly
router.get('/backup/full', backupFullDatabase);
router.get('/backup/:tableName', backupTable);

module.exports = router;
 