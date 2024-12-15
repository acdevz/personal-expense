const express = require('express');
const transactionController = require('../controllers/transactionController');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();

// router.use(authenticateToken);
router.post('/transactions', transactionController.createTransaction);
router.get('/transactions', transactionController.getTransactions);
router.get('/transactions/wallet/:walletId', transactionController.getTransactionsByWallet);
router.get('/transactions/period', transactionController.getTransactionsByPeriod);
router.get('/transactions/:id', transactionController.getTransactionById);
router.put('/transactions/:id', transactionController.updateTransaction);
router.delete('/transactions/:id', transactionController.deleteTransaction);
router.get('/transactions/recurring', transactionController.getRecurringTransactions);

module.exports = router;
