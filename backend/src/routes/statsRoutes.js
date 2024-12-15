const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');

router.get('/transactions/:userId', statsController.getTransactionStats);
router.get('/activities/:userId', statsController.getActivityStats);

module.exports = router