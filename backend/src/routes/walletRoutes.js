const express = require('express');
const { createWallet, getWallets, getWallet } = require('../controllers/walletController');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(authenticateToken);
router.post('/', createWallet);
router.get('/', getWallets);
router.get('/:id', getWallet);

module.exports = router;
