const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Wallet = require('./Wallet');
const Category = require('./Category');
const User = require('./User')

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

const Activity = require('./Activity');
Transaction.belongsTo(Wallet, { foreignKey: 'wallet', as: 'walletDetails' });
Transaction.belongsTo(Wallet, { foreignKey: 'transferFrom', as: 'transferFromDetails' });
Transaction.belongsTo(Wallet, { foreignKey: 'transferTo', as: 'transferToDetails' });
Transaction.belongsTo(Category, { foreignKey: 'category', as: 'categoryDetails' });
Transaction.belongsTo(User, { foreignKey: 'userId', as: 'userDetails' });
Transaction.hasMany(Activity, { foreignKey: 'transactionId', as: 'activities' });

module.exports = Transaction;
