const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');

router.get('/stats/transactions/:userId', statsController.getTransactionStats);
router.get('/stats/activities/:userId', statsController.getActivityStats);

module.exports = router