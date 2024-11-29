const express = require('express');
const { createWallet, getWallets } = require('../controllers/walletController');
const router = express.Router();

router.post('/wallets', createWallet);
router.get('/wallets', getWallets);

module.exports = router;
