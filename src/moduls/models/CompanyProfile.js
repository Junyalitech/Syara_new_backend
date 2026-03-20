const { DataTypes } = require('sequelize');
const sequelize = require('../../db/dbConnection');

const OurCompanyProfile = sequelize.define('OurCompanyProfile', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
   
}, {
    tableName: 'company_profile',
    timestamps: false
});

module.exports = OurCompanyProfile;
