const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../db/dbConnection');

const ContactUs = sequelize.define('ContactUs', {
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subject: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING, // Updated from DataTypes.NUMBER to DataTypes.STRING
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'contact_us', // Ensure this matches your SQL table name
    timestamps: false
});

module.exports = ContactUs;
