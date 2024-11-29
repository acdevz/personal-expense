const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Wallet = require('./Wallet');

const Transaction = sequelize.define('Transaction', {
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
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    note: {
        type: DataTypes.STRING,
    },
}, { timestamps: true });

Transaction.belongsTo(Wallet, { as: 'wallet' }); // Foreign key to Wallet
module.exports = Transaction;
