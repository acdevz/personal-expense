const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Wallet = require('./Wallet');
const User = require('./User')

const Collaborators = sequelize.define('Collaborators', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    walletId: {
        type: DataTypes.INTEGER,
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
        }
    }
});

module.exports = Collaborators;
