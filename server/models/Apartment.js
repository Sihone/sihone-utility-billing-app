const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Apartment = sequelize.define('Apartment', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: DataTypes.STRING,
  tenant_name: DataTypes.STRING,
  tenant_phone: DataTypes.STRING,
  tenant_email: DataTypes.STRING,
  registration_fee_due: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 10000
  },
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE
}, {
  timestamps: false, // Sequelize won't auto-manage createdAt/updatedAt
  tableName: 'apartments' // Match exactly the table name in MySQL
});

module.exports = Apartment;
