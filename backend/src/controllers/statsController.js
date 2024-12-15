const { Op } = require('sequelize');
const {Transactions, Wallet, Category, Activity} = require('../models');

const getTransactionStats = async (req, res) => {
    try {
        const { userId } = req.params;

        // 1. Total income, expense, and balance
        const income = await Transactions.sum('amount', { where: { userId, type: 'income' } });
        const expense = await Transactions.sum('amount', { where: { userId, type: 'expense' } });
        const balance = (income || 0) - (expense || 0);

        // 2. Transactions by Wallet
        const transactionsByWallet = await Transactions.findAll({
            attributes: ['wallet', [Transactions.sequelize.fn('SUM', Transactions.sequelize.col('amount')), 'totalAmount']],
            where: { userId, type: 'expense' },
            group: ['wallet'],
            include: [{ model: Wallet, as: 'walletDetails', attributes: ['name'] }],
        });

        // 3. Transactions by Category
        const transactionsByCategory = await Transactions.findAll({
            attributes: ['category', [Transactions.sequelize.fn('SUM', Transactions.sequelize.col('amount')), 'totalAmount']],
            where: { userId, type: 'expense' },
            group: ['category'],
            include: [{ model: Category, as: 'categoryDetails', attributes: ['name'] }],
        });

        // 4. Monthly Income and Expense Summary
        const monthlySummary = await Transactions.findAll({
            attributes: [
                [Transactions.sequelize.fn('DATE_FORMAT', Transactions.sequelize.col('date'), '%Y-%m'), 'month'],
                'type',
                [Transactions.sequelize.fn('SUM', Transactions.sequelize.col('amount')), 'totalAmount'],
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
