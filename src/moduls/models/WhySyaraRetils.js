// models/WhySyaraRetails.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../db/dbConnection');


const WhySyaraRetails = sequelize.define('WhySyaraRetails', {
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    images: {
        type: DataTypes.JSON, 
        allowNull: true
    }
}, {
    tableName: 'why_syara_retails', 
    timestamps: false 
});

module.exports = WhySyaraRetails;
