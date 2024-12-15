const Wallet = require('../models/Wallet');

const createWallet = async (req, res) => {
    const { name, balance, currency, userId } = req.body;
    try {
        const wallet = await Wallet.create({ name, balance, currency, userId });
        res.status(201).json(wallet);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create wallet', error: error.message });
    }
};

const getWallets = async (req, res) => {
    try {
        const wallets = await Wallet.findAll();
        res.status(200).json(wallets);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch wallets', error: error.message });
    }
};

const getWallet = async (req, res) => {
    try {
        const walletId = req.params.id;
        const wallet = await Wallet.findByPk(walletId);
        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
        }
        return res.status(200).json(wallet);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch wallet', error: error.message });
    }
};

module.exports = { createWallet, getWallets, getWallet };
