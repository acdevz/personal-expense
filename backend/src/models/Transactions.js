const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Wallet = require('./Wallet');
const Category = require('./Category');
const User = require('./User')

const Transactions = sequelize.define('Transactions', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    type: {
        type: DataTypes.ENUM('income', 'expense', 'transfer'),
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    category: {
        type: DataTypes.INTEGER,
        references:{
            model: Category,
            key: 'id'
        },
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    note: {
        type: DataTypes.STRING,
    },
    photo: {
        type: DataTypes.BLOB,
    },
    isRecurring: { type: DataTypes.BOOLEAN, defaultValue: false },
    recurrenceInterval: { type: DataTypes.INTEGER },
    recurrenceUnit: { 
        type: DataTypes.ENUM('day', 'week', 'month', 'year'), 
        allowNull: true 
    },
    nextOccurrence: { type: DataTypes.DATE },
    wallet: {
        type: DataTypes.INTEGER,
        references:{
            model: Wallet,
            key: 'id'
        },
        allowNull: false
    },
    transferFrom: { 
        type: DataTypes.INTEGER, 
        allowNull: true, 
        references:{
            model: Wallet,
            key: 'id'
        }
    },
    transferTo: { 
        type: DataTypes.INTEGER, 
        allowNull: true, 
        references: {
            model: Wallet,
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false
    }
}, { timestamps: true });

module.exports = Transactions;
