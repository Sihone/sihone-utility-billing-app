const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const sequelize = require('./server/models');
require('./server/models/associations');

const app = express();
app.use(cors());
app.use(express.json());

// DB sync
sequelize.sync().then(() => console.log('MySQL synced'));

// API routes
const apartmentRoutes = require('./server/routes/apartmentRoutes');
app.use('/api/apartments', apartmentRoutes);

const meterReadingRoutes = require('./server/routes/meterReadingRoutes');
app.use('/api/readings', meterReadingRoutes);

const invoiceRoutes = require('./server/routes/invoiceRoutes');
app.use('/api/invoices', invoiceRoutes);

const settingsRoutes = require('./server/routes/settingsRoutes');
app.use('/api/settings', settingsRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Serve frontend last
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
