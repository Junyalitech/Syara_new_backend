const { DataTypes } = require('sequelize');
const sequelize = require('../../db/dbConnection');
const { v4: uuidv4 } = require('uuid'); // UUID generator

const OurComboOffer = sequelize.define('OurComboOffer', {
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
  },
 
}, {
  tableName: 'our_combo_offers', // specify the table name here
  timestamps: false // Disable Sequelize's automatic timestamps
});

module.exports = OurComboOffer;
