const Apartment = require('./Apartment');
const MeterReading = require('./MeterReading');
const Invoice = require('./Invoice');

// Apartment -> MeterReadings
Apartment.hasMany(MeterReading, { foreignKey: 'apartment_id' });
MeterReading.belongsTo(Apartment, { foreignKey: 'apartment_id' });

// Apartment -> Invoices
Apartment.hasMany(Invoice, { foreignKey: 'apartment_id', as: 'invoices' });
Invoice.belongsTo(Apartment, { foreignKey: 'apartment_id', as: 'apartment' });

// MeterReading -> Invoice
MeterReading.hasOne(Invoice, {
  foreignKey: 'meter_reading_id',
  as: 'invoice'
});
Invoice.belongsTo(MeterReading, {
  foreignKey: 'meter_reading_id',
  as: 'meterReading'
});

module.exports = {
  Apartment,
  MeterReading,
  Invoice
};
