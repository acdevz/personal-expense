const express = require('express');
const activityController = require('../controllers/activityController');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();

// router.use(authenticateToken);
router.post('/', activityController.createActivity);
router.get('/user/:userId', activityController.getActivitiesByUser);
router.put('/:id/read', activityController.markActivityAsRead);

module.exports = router;
