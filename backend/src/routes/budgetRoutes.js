const express = require('express');
const {
    createBudget,
    getBudgets,
    getBudget,
} = require('../controllers/budgetController');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();

// router.use(authenticateToken);
router.post('/', createBudget);
router.get('/', getBudgets);  
router.get('/:id', getBudget);

module.exports = router;
