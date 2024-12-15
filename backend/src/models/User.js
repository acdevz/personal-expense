const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: true });

const Budget = require('./Budget');
const Collaborators = require('./Collaborators');
const Transaction = require('./Transaction');
const Activity = require('./Activity');
User.hasMany(Budget, { foreignKey: 'userId', as: 'budgets' });
User.hasMany(Collaborators, { foreignKey: 'userId' });
User.hasMany(Transaction, { foreignKey: 'userId' });
User.hasMany(Activity, { foreignKey: 'userId', as: 'activities' });

module.exports = User;
