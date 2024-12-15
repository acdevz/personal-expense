const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User')

const Category = sequelize.define('Category', {
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
    type: {
        type: DataTypes.ENUM('income', 'expense'),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references:{
            model: User,
            key: 'id'
        },
        allowNull: true
    }
}, { timestamps: true });

const Transaction = require('./Transaction');
Category.hasMany(Transaction, { foreignKey: 'categoryId' });
module.exports = Category;
