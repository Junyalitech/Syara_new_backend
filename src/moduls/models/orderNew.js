const { DataTypes } = require('sequelize');
const sequelize = require('../../db/dbConnection');
const User = require("../models/User");
const Cart = require("../models/CartNew")
const Product = require('../models/Product')
const Order = sequelize.define('Order', {
  orderId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  orderStatus: {
    type: DataTypes.ENUM('processing', 'confirmed', 'shipped', 'delivered', 'cancelled'),
    defaultValue: 'processing'
  },
  statusAt: {
    type: DataTypes.DATE
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users1', // Name of the users table
      key: 'id',
    },
  },
  Product1: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'cart2',
      key: 'cartId' // ✅ FIXED
    },
  },
  Pro_Qty1: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'cart2',
      key: 'cartId' // ✅ FIXED
    },
  },
  Product2: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'cart2', // Name of the products table
      key: 'cartId'
    },
  },
  Pro_Qty2: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'cart2', // Name of the products table
      key: 'cartId'
    },
  },
  Product3: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'cart2',
      key: 'cartId'
    },
  },
  Pro_Qty3: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'cart2', // Name of the products table
      key: 'cartId'
    },
  },
  Product4: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'cart2',
      key: 'cartId'
    },
  },
  Pro_Qty4: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'cart2', // Name of the products table
      key: 'cartId'
    },
  },
  Product5: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'cart2',
      key: 'cartId'
    },
  },
  Pro_Qty5: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'cart2', // Name of the products table
      key: 'cartId'
    },
  },
  Product6: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'cart2',
      key: 'cartId'
    },
  },
  Pro_Qty6: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'cart2', // Name of the products table
      key: 'cartId'
    },
  },
  Product7: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'cart2',
      key: 'cartId'
    },
  },
  Pro_Qty7: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'cart2', // Name of the products table
      key: 'cartId'
    },
  },
  Product8: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'cart2',
      key: 'cartId'
    },
  },
  Pro_Qty8: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'cart2', // Name of the products table
      key: 'cartId'
    },
  },
  Product9: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'cart2',
      key: 'cartId'
    },
  },
  Pro_Qty9: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'cart2', // Name of the products table
      key: 'cartId'
    },
  },
  Product10: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'cart2',
      key: 'cartId'
    },
  },
  Pro_Qty10: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'cart2', // Name of the products table
      key: 'cartId'
    },
  },
  transportType: {
    type: DataTypes.ENUM('FREE', 'NCR-PORTER', 'NCR-CORRIER', 'OUT STATION LAND', 'OUT STATION AIR')
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2)
  },
  discountName: {
    type: DataTypes.STRING
  },
  discountAmount: {
    type: DataTypes.DECIMAL(10, 2)
  },
  paymentStatus: {
    type: DataTypes.ENUM('Pending', 'Completed', 'Failed', 'Cancelled')
  },
  tax: {
    type: DataTypes.DECIMAL(10, 2)
  },
  grandTotal: {
    type: DataTypes.DECIMAL(10, 2)
  },
  shippingStreet: {
    type: DataTypes.STRING
  },
  shippingCity: {
    type: DataTypes.STRING
  },
  shippingState: {
    type: DataTypes.STRING
  },
  shippingPincode: {
    type: DataTypes.STRING
  },
  shippingCountry: {
    type: DataTypes.STRING
  },
  shippingContact: {
    type: DataTypes.BIGINT
  },
  shippingPersonName: {
    type: DataTypes.STRING
  },
  billingStreet: {
    type: DataTypes.STRING
  },
  billingCity: {
    type: DataTypes.STRING
  },
  billingState: {
    type: DataTypes.STRING
  },
  billingPincode: {
    type: DataTypes.STRING
  },
  billingCountry: {
    type: DataTypes.STRING
  },
  deliveryDate: {
    type: DataTypes.DATE
  },
  transportationCost: {
    type: DataTypes.DECIMAL(10, 2)
  },
  transportationType: {
    type: DataTypes.ENUM('Free', 'NCR-porter', 'NCR-courier', 'Out station Land', 'Out station Air')
  },
  paymentType: {
    type: DataTypes.ENUM('UPI', 'COD')
  },
  paymentStatus: {
    type: DataTypes.ENUM('Pending', 'Paid', 'Failed', 'Refunded')
  },
  isCancelled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  cancellationReason: {
    type: DataTypes.STRING
  },
  isReturned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  returnReason: {
    type: DataTypes.STRING
  },
  refundAmount: {
    type: DataTypes.DECIMAL(10, 2)
  },
  trackingNumber: {
    type: DataTypes.BIGINT
  }
}, {
  tableName: 'ordersnew',
  timestamps: false
});

Order.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Order, { foreignKey: 'userId' });

// In your Order model
Order.belongsTo(Product, { foreignKey: 'ProductId', as: 'products' });

// In your Product model
Product.hasMany(Order, { foreignKey: 'ProductId', as: 'ordersnew' });



//Order.belongsTo(Cart, { foreignKey: 'cart2' });
//Cart.hasMany(Order, { foreignKey: 'cart2' });
module.exports = Order;
