const { Op } = require('sequelize');
const Transaction = require('../models/Transaction');
const Wallet = require('../models/Wallet');
const Category = require('../models/Category');
const Activity = require('../models/Activity');

const getTransactionStats = async (req, res) => {
    try {
        const { userId } = req.params;

        // 1. Total income, expense, and balance
        const income = await Transaction.sum('amount', { where: { userId, type: 'income' } });
        const expense = await Transaction.sum('amount', { where: { userId, type: 'expense' } });
        const balance = (income || 0) - (expense || 0);

        // 2. Transactions by Wallet
        const transactionsByWallet = await Transaction.findAll({
            attributes: ['wallet', [Transaction.sequelize.fn('SUM', Transaction.sequelize.col('amount')), 'totalAmount']],
            where: { userId, type: 'expense' },
            group: ['wallet'],
            include: [{ model: Wallet, as: 'walletDetails', attributes: ['name'] }],
        });

        // 3. Transactions by Category
        const transactionsByCategory = await Transaction.findAll({
            attributes: ['category', [Transaction.sequelize.fn('SUM', Transaction.sequelize.col('amount')), 'totalAmount']],
            where: { userId, type: 'expense' },
            group: ['category'],
            include: [{ model: Category, as: 'categoryDetails', attributes: ['name'] }],
        });

        // 4. Monthly Income and Expense Summary
        const monthlySummary = await Transaction.findAll({
            attributes: [
                [Transaction.sequelize.fn('DATE_FORMAT', Transaction.sequelize.col('date'), '%Y-%m'), 'month'],
                'type',
                [Transaction.sequelize.fn('SUM', Transaction.sequelize.col('amount')), 'totalAmount'],
            ],
            where: { userId },
            group: ['month', 'type'],
            order: [['month', 'ASC']],
        });

        return res.status(200).json({
            income: income || 0,
            expense: expense || 0,
            balance,
            transactionsByWallet,
            transactionsByCategory,
            monthlySummary,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to fetch stats', error: error.message });
    }
};

const getActivityStats = async (req, res) => {
    try {
        const { userId } = req.params;

        // Count unread notifications
        const unreadCount = await Activity.count({
            where: { userId, isRead: false },
        });

        // Activity count by type
        const activityByType = await Activity.findAll({
            attributes: ['type', [Activity.sequelize.fn('COUNT', '*'), 'count']],
            where: { userId },
            group: ['type'],
        });

        return res.status(200).json({
            unreadCount,
            activityByType,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to fetch activity stats', error: error.message });
    }
};

module.exports = {
    getTransactionStats,
    getActivityStats,
};
