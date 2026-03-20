const { DataTypes } = require('sequelize');
const sequelize = require('../../db/dbConnection');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true  // Ensure uniqueness if needed
  },
  image: {
    type: DataTypes.STRING, // Store the image filename or URL
    allowNull: true
  }
}, {
  tableName: 'category',
  timestamps: false
});

module.exports = Category;
