const { DataTypes } = require('sequelize');
const sequelize = require('../../db/dbConnection'); 

const FAQ = sequelize.define('FAQ', {
  question: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  answer: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
}, {
  timestamps: true,
  tableName: 'faqs',
});

module.exports = FAQ;