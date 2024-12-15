const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Wallet = require('./Wallet');
const User = require('./User')

const Budget = sequelize.define('Budget', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Cash Wallet'
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    currency: {
        type: DataTypes.STRING,
        defaultValue: 'INR',
    },
    wallet: {
        type: DataTypes.INTEGER,
        references:{
            model: Wallet,
            key: 'id'
        },
        allowNull: false
    },
    isRecurring: { type: DataTypes.BOOLEAN, defaultValue: false },
    recurrenceInterval: { type: DataTypes.INTEGER }, // E.g., 2
    recurrenceUnit: { 
        type: DataTypes.ENUM('day', 'week', 'month', 'year'), 
        allowNull: true 
    },
    startDate: { type: DataTypes.DATE },
    nextOccurrence: { type: DataTypes.DATE },
    userId: {
        type: DataTypes.INTEGER,
        references:{
            model: User,
            key: 'id'
        },
        allowNull: false
    }
}, { timestamps: true });

module.exports = Budget;
