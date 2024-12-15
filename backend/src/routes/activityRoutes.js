const express = require('express');
const activityController = require('../controllers/activityController');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();

// router.use(authenticateToken);
router.post('/activities', activityController.createActivity);
router.get('/activities/user/:userId', activityController.getActivitiesByUser);
router.put('/activities/:id/read', activityController.markActivityAsRead);

module.exports = router;
