const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Wallet = sequelize.define('Wallet', {
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
    balance: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
    },
    currency: {
        type: DataTypes.STRING,
        defaultValue: 'INR',
    },
    userId: {
        type: DataTypes.INTEGER,
        references:{
            model: User,
            key: 'id'
        },
        allowNull: false
    }
}, { timestamps: true });

module.exports = Wallet;
