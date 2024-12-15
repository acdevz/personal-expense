const { Op } = require('sequelize');
const Budget = require('../models/Budget');
const Wallet = require('../models/Wallet');
const Transaction = require('../models/Transaction'); // Import Transaction model
const User = require('../models/User');

const createBudget = async (req, res) => {
    try {
        const {
            name,
            amount,
            currency,
            wallet,
            isRecurring,
            recurrenceInterval,
            recurrenceUnit,
            startDate,
            userId,
        } = req.body;

        if (!amount || !wallet || !userId) {
            return res.status(400).json({ message: 'Amount, wallet, and userId are required.' });
        }

        const newBudget = await Budget.create({
            name,
            amount,
            currency,
            wallet,
            isRecurring,
            recurrenceInterval,
            recurrenceUnit,
            startDate,
            nextOccurrence: startDate,
            userId,
        });

        return res.status(201).json({
            message: 'Budget created successfully',
            budget: newBudget,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getBudgets = async (req, res) => {
    try {
        const budgets = await Budget.findAll({
            include: [
                { model: Wallet, as: 'walletDetails' },
                { model: User, as: 'userDetails' },
            ],
        });

        const budgetsWithAmountUsed = await Promise.all(
            budgets.map(async (budget) => {
                const transactions = await Transaction.sum('amount', {
                    where: {
                        walletId: budget.wallet, // Link wallet
                        date: {
                            [Op.gte]: budget.startDate,
                            [Op.lte]: budget.nextOccurrence, // Within budget date scope
                        },
                    },
                });

                return {
                    ...budget.toJSON(),
                    amountUsed: transactions || 0, // Default to 0 if no transactions
                };
            })
        );

        return res.status(200).json({
            message: 'Budgets retrieved successfully',
            budgets: budgetsWithAmountUsed,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const getBudget = async (req, res) => {
    try {
        const { id } = req.params;

        const budget = await Budget.findByPk(id, {
            include: [
                { model: Wallet, as: 'walletDetails' },
                { model: User, as: 'userDetails' },
            ],
        });

        if (!budget) {
            return res.status(404).json({ message: 'Budget not found' });
        }

        const amountUsed = await Transaction.sum('amount', {
            where: {
                walletId: budget.wallet,
                date: {
                    [Op.gte]: budget.startDate,
                    [Op.lte]: budget.nextOccurrence,
                },
            },
        });

        return res.status(200).json({
            message: 'Budget retrieved successfully',
            budget: {
                ...budget.toJSON(),
                amountUsed: amountUsed || 0,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    createBudget,
    getBudgets,
    getBudget,
};
