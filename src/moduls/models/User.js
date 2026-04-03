const { DataTypes } = require('sequelize');
const sequelize = require('../../db/dbConnection'); // Adjust if the path is different

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
pincode:{
  type: DataTypes.STRING,
},
  updateaddress: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },
  role: {
    type: DataTypes.ENUM, // Use ENUM for clear role definition
    values: ['customer', 'merchant'], // Define possible values for role
    defaultValue: 'customer', // Set default role to customer
  },
}, {
  timestamps: true,
  tableName: 'users1', // Ensure this matches your database schema
});

module.exports = User;