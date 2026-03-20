const { DataTypes } = require('sequelize');
const sequelize = require('../../db/dbConnection');

const OurDirectorProfile = sequelize.define('OurDirectorProfile', {
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
    tableName: 'director_profile',
    timestamps: false
});

module.exports = OurDirectorProfile;
