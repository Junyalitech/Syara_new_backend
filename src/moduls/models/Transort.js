const { DataTypes } = require('sequelize');
const sequelize = require('../../db/dbConnection');

const Transportation = sequelize.define('Transportation', {
  pincode: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  free_delivery_available: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

  free_delivery_charge: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },

  porter_available: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

  porter_charge: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },

  courier_road_available: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },


  courier_road_charge: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },

  courier_air_available: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

  courier_air_charge: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },

  free_delivery_time: {
    type: DataTypes.STRING, // "2-3 days"
  },
  
  porter_time: {
    type: DataTypes.STRING, // "2-4 hours"
  },
  
  courier_road_time: {
    type: DataTypes.STRING, // "3-5 days"
  },
  
  courier_air_time: {
    type: DataTypes.STRING, // "1-2 days"
  },

}, {
  tableName: 'pincodes',
  timestamps: false
});

module.exports = Transportation;