const { DataTypes } = require('sequelize');
const sequelize = require('../../db/dbConnection');

const OurTeam = sequelize.define('OurTeam', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    image: {
        type: DataTypes.STRING, // Store the image filename or URL
        allowNull: true
    },
    position: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fb_link: {
        type: DataTypes.STRING,
        allowNull: true
    },
    insta_link: {
        type: DataTypes.STRING,
        allowNull: true
    },
    whatsapp_link: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    tableName: 'our_team',
    timestamps: false
});

module.exports = OurTeam;
