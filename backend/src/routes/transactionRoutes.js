const express = require('express');
const transactionController = require('../controllers/transactionController');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(authenticateToken);
router.post('/', transactionController.createTransaction);
router.get('/', transactionController.getTransactions);
router.get('/wallet/:walletId', transactionController.getTransactionsByWallet);
router.get('/period', transactionController.getTransactionsByPeriod);
router.get('/:id', transactionController.getTransactionById);
router.put('/:id', transactionController.updateTransaction);
router.delete('/:id', transactionController.deleteTransaction);
router.get('/recurring', transactionController.getRecurringTransactions);

module.exports = router;
