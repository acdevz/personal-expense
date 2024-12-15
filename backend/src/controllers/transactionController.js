const { Op } = require('sequelize');
const Transaction = require('../models/Transaction');
const Wallet = require('../models/Wallet');
const Category = require('../models/Category');
const User = require('../models/User');

// Create a new transaction
const createTransaction = async (req, res) => {
    try {
        const {
            type,
            amount,
            category,
            date,
            note,
            photo,
            isRecurring,
            recurrenceInterval,
            recurrenceUnit,
            wallet,
            transferFrom,
            transferTo,
            userId,
        } = req.body;

        if (!type || !amount || !wallet || !userId || !category) {
            return res.status(400).json({ message: 'Required fields are missing.' });
        }

        // Validate transfer wallets
        if (type === 'transfer' && (!transferFrom || !transferTo || transferFrom === transferTo)) {
            return res.status(400).json({ message: 'Invalid transfer wallets.' });
        }

        const newTransaction = await Transaction.create({
            type,
            amount,
            category,
            date,
            note,
            photo,
            isRecurring,
            recurrenceInterval,
            recurrenceUnit,
            wallet,
            transferFrom,
            transferTo,
            nextOccurrence: isRecurring ? date : null,
            userId,
        });

        return res.status(201).json({
            message: 'Transaction created successfully',
            transaction: newTransaction,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all transactions
const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.findAll({
            include: [
                { model: Wallet, as: 'walletDetails' },
                { model: Category, as: 'categoryDetails' },
                { model: User, as: 'userDetails' },
            ],
            order: [['date', 'DESC']],
        });

        return res.status(200).json({
            message: 'Transactions retrieved successfully',
            transactions,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get a single transaction by ID
const getTransactionById = async (req, res) => {
    try {
        const { id } = req.params;

        const transaction = await Transaction.findByPk(id, {
            include: [
                { model: Wallet, as: 'walletDetails' },
                { model: Category, as: 'categoryDetails' },
            ],
        });

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        return res.status(200).json({
            message: 'Transaction retrieved successfully',
            transaction,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all transactions by wallet ID
const getTransactionsByWallet = async (req, res) => {
    try {
        const { walletId } = req.params;

        const transactions = await Transaction.findAll({
            where: { wallet: walletId },
            include: [
                { model: Wallet, as: 'walletDetails' },
                { model: Category, as: 'categoryDetails' },
            ],
            order: [['date', 'DESC']],
        });

        return res.status(200).json({
            message: `Transactions for wallet ${walletId} retrieved successfully`,
            transactions,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get transactions within a date range
const getTransactionsByPeriod = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({
                message: 'Please provide both startDate and endDate in YYYY-MM-DD format',
            });
        }

        const transactions = await Transaction.findAll({
            where: {
                date: {
                    [Op.between]: [new Date(startDate), new Date(endDate)],
                },
            },
            include: [
                { model: Wallet, as: 'walletDetails' },
                { model: Category, as: 'categoryDetails' },
            ],
            order: [['date', 'DESC']],
        });

        return res.status(200).json({
            message: `Transactions from ${startDate} to ${endDate} retrieved successfully`,
            transactions,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update a transaction
const updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;

        const transaction = await Transaction.findByPk(id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        const updatedData = req.body;
        await transaction.update(updatedData);

        return res.status(200).json({
            message: 'Transaction updated successfully',
            transaction,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete a transaction
const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;

        const transaction = await Transaction.findByPk(id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        await transaction.destroy();

        return res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get recurring transactions
const getRecurringTransactions = async (req, res) => {
    try {
        const recurringTransactions = await Transaction.findAll({
            where: {
                isRecurring: true,
            },
            include: [
                { model: Wallet, as: 'walletDetails' },
                { model: Category, as: 'categoryDetails' },
            ],
        });

        return res.status(200).json({
            message: 'Recurring transactions retrieved successfully',
            transactions: recurringTransactions,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    createTransaction,
    getTransactions,
    getTransactionById,
    getTransactionsByWallet,
    getTransactionsByPeriod,
    updateTransaction,
    deleteTransaction,
    getRecurringTransactions,
};
