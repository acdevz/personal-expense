const app = require('./src/app');
const sequelize = require('./src/config/db');

// Start the server
const PORT = process.env.PORT || 5000;
sequelize.sync({ force: false }) // Use `force: true` to reset tables
    .then(() => {
        console.log('🔗 Database connected');
        app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
    })
    .catch(err => console.error('Database connection failed:', err));
