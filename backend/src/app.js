const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { healthCheck } = require('./controllers/healthCheckController');
const userRoutes = require('./routes/userRoutes')
const walletRoutes = require('./routes/walletRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.get('/api', healthCheck);

app.use('/api/users', userRoutes);
app.use('/api/wallets', walletRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/transactions', transactionRoutes);

module.exports = app;
