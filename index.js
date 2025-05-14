const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Apartment = require('./server/models/Apartment');
const sequelize = require('./server/models');
require('./server/models/associations');

const app = express();
app.use(cors());
app.use(express.json());

sequelize.sync().then(() => console.log('MySQL synced'));

const apartmentRoutes = require('./server/routes/apartmentRoutes');
app.use('/api/apartments', apartmentRoutes);

const meterReadingRoutes = require('./server/routes/meterReadingRoutes');
app.use('/api/readings', meterReadingRoutes);

const invoiceRoutes = require('./server/routes/invoiceRoutes');
app.use('/api/invoices', invoiceRoutes);

const settingsRoutes = require('./server/routes/settingsRoutes');
app.use('/api/settings', settingsRoutes);

const path = require('path');
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});
