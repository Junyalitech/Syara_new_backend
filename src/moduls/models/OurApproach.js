const { DataTypes } = require('sequelize');
const sequelize = require('../../db/dbConnection');

const OurApproach = sequelize.define('OurApproach', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    text1: {
        type: DataTypes.STRING,
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
    text4: {
        type: DataTypes.STRING,
        allowNull: false
    },
    text5: {
        type: DataTypes.STRING,
        allowNull: false
    },
    text6: {
        type: DataTypes.STRING,
        allowNull: false
    },
    text7: {
        type: DataTypes.STRING,
        allowNull: false
    },
    text8: {
        type: DataTypes.STRING,
        allowNull: false
    },
    text9: {
        type: DataTypes.STRING,
        allowNull: false
    },
    text10: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'our_approach',
    timestamps: false
});

module.exports = OurApproach;
