const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Invoice = sequelize.define('Invoice', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  apartment_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false
  },
  meter_reading_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false
  },
  start_index: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  end_index: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  consumption: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  invoice_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  fixed_fee_used: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  rate_per_m3_used: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  registration_fee: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'invoices',
  timestamps: false
});

module.exports = Invoice;
