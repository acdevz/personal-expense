const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Transaction = require('./Transaction')

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
            model: Transaction,
            key: 'id'
        },
        allowNull: true
    },
}, { timestamps: true });

Activity.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Activity.belongsTo(Transaction, { foreignKey: 'transactionId', as: 'transaction' });

module.exports = Activity;
