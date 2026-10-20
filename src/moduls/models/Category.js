const { DataTypes } = require('sequelize');
const sequelize = require('../../db/dbConnection');

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    status: {
        type: DataTypes.ENUM('active', 'deactive'),
        allowNull: false,
        defaultValue: 'active'
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },

    // New category header image field
    headerImage: {
        type: DataTypes.STRING,
        allowNull: true
    },

    discount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    type: {
        type: DataTypes.ENUM('Vegetable', 'Fruit'),
        allowNull: false,
        defaultValue: 'Vegetable'
    }
}, {
    tableName: 'category',
    timestamps: false
});

module.exports = Category;