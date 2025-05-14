const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const MeterReading = sequelize.define('MeterReading', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  apartment_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false
  },
  reading_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  meter_index: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'meter_readings',
  timestamps: false
});

module.exports = MeterReading
