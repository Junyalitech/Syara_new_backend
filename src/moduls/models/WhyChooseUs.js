const { DataTypes } = require('sequelize');
const sequelize = require('../../db/dbConnection');

const WhyChooseUs = sequelize.define('WhyChooseUs', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  image: {
    type: DataTypes.JSON,
    allowNull: false
  },
  text1: {
    type: DataTypes.STRING
  },
  text2: {
    type: DataTypes.STRING
  },
  text3: {
    type: DataTypes.STRING
  },
  text4: {
    type: DataTypes.STRING
  },
  text5: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'why_choose_us',
  timestamps: false
});

module.exports = WhyChooseUs;
