const Wallet = require('../models/Wallet');

// Create a new wallet
const createWallet = async (req, res) => {
    const { name, balance, currency } = req.body;
    try {
        const wallet = await Wallet.create({ name, balance, currency });
        res.status(201).json(wallet);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create wallet', error: error.message });
    }
};

// Get all wallets
const getWallets = async (req, res) => {
    try {
        const wallets = await Wallet.findAll();
        res.status(200).json(wallets);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch wallets', error: error.message });
    }
};

module.exports = { createWallet, getWallets };
