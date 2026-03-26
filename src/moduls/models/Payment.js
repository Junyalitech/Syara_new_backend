const { DataTypes } = require('sequelize');
const sequelize = require('../../db/dbConnection');

const PaymentMethod = sequelize.define('PaymentMethod', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING, // 'card', 'upi', 'wallet', etc.
    allowNull: false,
  },
  details: {
    type: DataTypes.JSON, // card number, expiry, UPI id etc.
    allowNull: false,
  },
  isDefault: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  tableName: 'payment_methods',
  timestamps: true,
});

module.exports = PaymentMethod;