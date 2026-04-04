const { DataTypes } = require("sequelize");
const sequelize = require("../../db/dbConnection");
const OrderItem = require("./korderItems");
const Product = require("./Product");

const Order = sequelize.define("Order", {
  orderId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  orderStatus: {
    type: DataTypes.ENUM(
      "processing",
      "confirmed",
      "shipped",
      "delivered",
      "cancelled"
    ),
    defaultValue: "processing",
  },

  subtotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  grandTotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  transportationCost: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },

  paymentType: {
    type: DataTypes.ENUM("Online", "COD"),
    allowNull: false,
  },

  paymentStatus: {
    type: DataTypes.ENUM("Pending", "Paid", "Failed"),
    defaultValue: "Pending",
  },

  razorpayOrderId: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.TEXT, // or STRING
    allowNull: true,
  },
  // deliveryTime:{
  //   type: DataTypes.STRING,
  //   allowNull: true,
  // }
  
}, {
  tableName: "orders",
  timestamps: true,
});

Order.hasMany(OrderItem, { foreignKey: "orderId" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });

OrderItem.belongsTo(Product, { foreignKey: "productId" });
Product.hasMany(OrderItem, { foreignKey: "productId" });

module.exports = Order;