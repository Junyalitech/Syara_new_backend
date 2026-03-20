const { DataTypes } = require('sequelize');
const sequelize = require('../../db/dbConnection');

const DeliveryOption = sequelize.define('DeliveryOption', {
  pincode: {
    type: DataTypes.STRING,
    allowNull: false,
    
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  condition: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rate: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: false
  },
  distance: {
    type: DataTypes.STRING,
    allowNull: true
  },
  minOrder: {
    type: DataTypes.FLOAT, // Or INTEGER, depending on your requirements
    allowNull: false,      // Ensure this is set to `true` if null values should be allowed
    validate: {
      notNull: {
        msg: 'Minimum order value cannot be null'
      },
    },
  },
}, {
  tableName: 'delivery_options',
  timestamps: false
});

module.exports = DeliveryOption;
