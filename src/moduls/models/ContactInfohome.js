// models/contactInfo.js

const { DataTypes } = require('sequelize');
const sequelize = require('../../db/dbConnection'); // Adjust the path to your database config

const ContactInfo = sequelize.define('ContactInfo', {
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isNumeric: true,
      len: [10, 15], // Assuming phone numbers are between 10 and 15 digits
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
}, {
  timestamps: true,
  tableName: 'contact_info_home', // Custom table name
});

module.exports = ContactInfo;
