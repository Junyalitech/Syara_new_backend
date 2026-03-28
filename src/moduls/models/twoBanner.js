const { DataTypes } = require('sequelize');
const sequelize = require('../../db/dbConnection');
const { v4: uuidv4 } = require('uuid'); // UUID generator

const TwoBanner = sequelize.define('Image', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // Automatically generate UUID
    primaryKey: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
 
  title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  subtitle: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  button: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'TwoBanner', // specify the table name here
  timestamps: false // Disable Sequelize's automatic timestamps
});

module.exports = TwoBanner;