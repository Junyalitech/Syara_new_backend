const { DataTypes } = require('sequelize');
const sequelize = require('../../db/dbConnection');
const { v4: uuidv4 } = require('uuid'); // UUID generator

const Testimonial = sequelize.define('Testimonial', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // Automatically generate UUID
    primaryKey: true
  },
  
  testimonialdetails: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  testimonialname: {
    type: DataTypes.TEXT,
    allowNull: false
  },
 
}, {
  tableName: 'our_testimonial', // specify the table name here
  timestamps: false // Disable Sequelize's automatic timestamps
});

module.exports = Testimonial;
