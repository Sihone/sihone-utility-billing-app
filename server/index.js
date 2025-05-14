const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Apartment = require('./models/Apartment');
const sequelize = require('./models');
require('./models/associations');

const app = express();
app.use(cors());
app.use(express.json());

sequelize.sync().then(() => console.log('MySQL synced'));

const apartmentRoutes = require('./routes/apartmentRoutes');
app.use('/api/apartments', apartmentRoutes);

const meterReadingRoutes = require('./routes/meterReadingRoutes');
app.use('/api/readings', meterReadingRoutes);

const invoiceRoutes = require('./routes/invoiceRoutes');
app.use('/api/invoices', invoiceRoutes);

const settingsRoutes = require('./routes/settingsRoutes');
app.use('/api/settings', settingsRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});
