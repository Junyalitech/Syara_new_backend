const { DataTypes } = require('sequelize');
const sequelize = require('../../db/dbConnection');

const OurDirectorManagingWords = sequelize.define('OurDirectorManagingWords', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    
    text1: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    text2: {
        type: DataTypes.STRING,
        allowNull: false
    },
    text3: {
        type: DataTypes.STRING,
        allowNull: false
    },
   
}, {
    tableName: 'director_managing_words',
    timestamps: false
});

module.exports = OurDirectorManagingWords;
