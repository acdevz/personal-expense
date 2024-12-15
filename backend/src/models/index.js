const Wallet = require('./Wallet');
const Category = require('./Category');
const User = require('./User');
const Activity = require('./Activity');
const Budget = require('./Budget');
const Collaborators = require('./Collaborators');
const Transactions = require('./Transactions');

Activity.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Activity.belongsTo(Transactions, { foreignKey: 'transactionId', as: 'transaction' });

Collaborators.belongsTo(Wallet, { foreignKey: 'walletId' });
Collaborators.belongsTo(User, { foreignKey: 'userId' });

Transactions.belongsTo(Wallet, { foreignKey: 'wallet', as: 'walletDetails' });
Transactions.belongsTo(Wallet, { foreignKey: 'transferFrom', as: 'transferFromDetails' });
Transactions.belongsTo(Wallet, { foreignKey: 'transferTo', as: 'transferToDetails' });
Transactions.belongsTo(Category, { foreignKey: 'category', as: 'categoryDetails' });
Transactions.belongsTo(User, { foreignKey: 'userId', as: 'userDetails' });
Transactions.hasMany(Activity, { foreignKey: 'transactionId', as: 'activities' });

Category.hasMany(Transactions, { foreignKey: 'categoryId' });

Budget.belongsTo(Wallet, { foreignKey: 'wallet', as: 'walletDetails' });
Budget.belongsTo(User, { foreignKey: 'userId', as: 'userDetails' });

Wallet.hasMany(Budget, { foreignKey: 'wallet', as: 'budgets' });
Wallet.hasMany(Collaborators, { foreignKey: 'walletId' });
Wallet.hasMany(Transactions, { foreignKey: 'walletId' });

User.hasMany(Budget, { foreignKey: 'userId', as: 'budgets' });
User.hasMany(Collaborators, { foreignKey: 'userId' });
User.hasMany(Transactions, { foreignKey: 'userId' });
User.hasMany(Activity, { foreignKey: 'userId', as: 'activities' });

module.exports = {
    Wallet,
    Category,
    User,
    Activity,
    Budget,
    Collaborators,
    Transactions
}