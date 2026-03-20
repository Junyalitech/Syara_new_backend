// models/NewLaunch.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/dbConnection');
const { v4: uuidv4 } = require('uuid'); // UUID generator

const NewLaunch = sequelize.define('NewLaunch', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // Automatically generate UUID
    primaryKey: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'new_launches',
  timestamps: false
});

module.exports = NewLaunch;
