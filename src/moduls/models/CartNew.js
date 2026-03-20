const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../db/dbConnection');
const User = require('../models/User');
const Product = require("../models/Product");
const Transport = require("../models/trsanportation");

class Cart extends Model {}

Cart.init({
    cartId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    time_stemp: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users1',
            key: 'id',
        },
    },

    // ✅ FIX: add onDelete for safety (optional but recommended)
    Product1: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'products',
            key: 'id',
        },
        onDelete: 'SET NULL'
    },
    Pro_Qty1: { type: DataTypes.INTEGER },

    Product2: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'products', key: 'id' },
        onDelete: 'SET NULL'
    },
    Pro_Qty2: { type: DataTypes.INTEGER },

    Product3: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'products', key: 'id' },
        onDelete: 'SET NULL'
    },
    Pro_Qty3: { type: DataTypes.INTEGER },

    Product4: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'products', key: 'id' },
        onDelete: 'SET NULL'
    },
    Pro_Qty4: { type: DataTypes.INTEGER },

    Product5: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'products', key: 'id' },
        onDelete: 'SET NULL'
    },
    Pro_Qty5: { type: DataTypes.INTEGER },

    Product6: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'products', key: 'id' },
        onDelete: 'SET NULL'
    },
    Pro_Qty6: { type: DataTypes.INTEGER },

    Product7: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'products', key: 'id' },
        onDelete: 'SET NULL'
    },
    Pro_Qty7: { type: DataTypes.INTEGER },

    Product8: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'products', key: 'id' },
        onDelete: 'SET NULL'
    },
    Pro_Qty8: { type: DataTypes.INTEGER },

    Product9: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'products', key: 'id' },
        onDelete: 'SET NULL'
    },
    Pro_Qty9: { type: DataTypes.INTEGER },

    Product10: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'products', key: 'id' },
        onDelete: 'SET NULL'
    },
    Pro_Qty10: { type: DataTypes.INTEGER },

    subtotal: { type: DataTypes.FLOAT, allowNull: false },
    discount_name: { type: DataTypes.STRING(255) },
    discount_amount: { type: DataTypes.FLOAT },

    payment_status: {
        type: DataTypes.ENUM('Pending', 'Completed', 'Failed', 'Cancelled'),
        allowNull: false,
    },

    Shipping_street: { type: DataTypes.STRING(255), allowNull: false },
    Shipping_city: { type: DataTypes.STRING(255), allowNull: false },
    Shipping_pincode: { type: DataTypes.STRING(10), allowNull: false },
    Shipping_state: { type: DataTypes.STRING(255), allowNull: false },
    Shipping_country: { type: DataTypes.STRING(255), allowNull: false },

    // ✅ already fixed by you 👍
    Shipping_contact: { type: DataTypes.STRING },

    Shipping_person_name: { type: DataTypes.STRING(255), allowNull: false },

    tax: { type: DataTypes.FLOAT, allowNull: false },
    Grand_Total: { type: DataTypes.FLOAT, allowNull: false },

    delivery_date: { type: DataTypes.DATE },

    // ✅ correct FK now
    delivery_option_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'delivery_options',
            key: 'id'
        },
        onDelete: 'SET NULL'
    },

    // ✅ correct (no FK)
    Transportation_total_cost: {
        type: DataTypes.FLOAT,
        allowNull: true
    },

}, {
    sequelize,
    modelName: 'Cart',
    tableName: 'cart2',
    timestamps: false,
});

// associations
Cart.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Cart, { foreignKey: 'userId' });

Cart.belongsTo(Product, { foreignKey: 'Product1' });
Product.hasMany(Cart, { foreignKey: 'Product1' });

module.exports = Cart;