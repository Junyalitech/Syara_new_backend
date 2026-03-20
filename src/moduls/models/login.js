const { DataTypes } = require('sequelize');
const sequelize = require('../../db/dbConnection');
const { v4: uuidv4 } = require('uuid'); // UUID generator

const Login = sequelize.define('Login', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Automatically generate UUID
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'login', // specify the table name here
    timestamps: false // Disable Sequelize's automatic timestamps
});

module.exports = Login;
