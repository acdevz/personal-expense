const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const walletRoutes = require('./routes/walletRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', walletRoutes);

module.exports = app;
