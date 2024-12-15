const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { healthCheck } = require('./controllers/healthCheckController');
const userRoutes = require('./routes/userRoutes')
const walletRoutes = require('./routes/walletRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const statsRoutes = require('./routes/statsRoutes');
const activityRoutes = require('./routes/activityRoutes');
const { validateToken } = require('./controllers/validateToken');
const morgan = require('morgan');
const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.get('/api', healthCheck);
app.get('/api/validateToken', validateToken);

app.use('/api/users', userRoutes);
app.use('/api/wallets', walletRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/activities', activityRoutes);

module.exports = app;
