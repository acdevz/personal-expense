const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Transactions = require('./Transactions')

const Activity = sequelize.define('Activity', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    type: {
        type: DataTypes.ENUM('budget_reminder', 'transaction_alert', 'general_notification'),

    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE
    },
    isRead : {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references:{
            model: User,
            key: 'id'
        },
        allowNull: false
    },
    transactionId: {
        type: DataTypes.INTEGER,
        references:{
            model: Transactions,
            key: 'id'
        },
        allowNull: true
    },
}, { timestamps: true });

module.exports = Activity;
