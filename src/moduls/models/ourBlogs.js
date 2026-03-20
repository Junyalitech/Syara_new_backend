const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../db/dbConnection')

const OurBlogs = sequelize.define('OurBlogs', {
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING, 
        allowNull: false
    }
}, {
    tableName: 'our_blogs', 
    timestamps: false 
});

module.exports = OurBlogs;
