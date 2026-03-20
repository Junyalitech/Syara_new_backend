const { DataTypes } = require('sequelize');
const sequelize = require('../../db/dbConnection');
const { v4: uuidv4 } = require('uuid'); // UUID generator
const Image = sequelize.define('Image', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // Automatically generate UUID
    primaryKey: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'hall_of_frame', // specify the table name here
  timestamps: false // Disable Sequelize's automatic timestamps
});

module.exports = Image;
