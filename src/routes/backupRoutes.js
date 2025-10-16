const express = require('express');
const router = express.Router();
const {backupController} = require('../controllers/backupController')

router.post('/backup/full', backupController.backupFullDatabase);
router.post('/backup/:tableName', backupController.backupTable)

module.exports = router;