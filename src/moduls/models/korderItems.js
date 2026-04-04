const { DataTypes } = require("sequelize");
const sequelize = require("../../db/dbConnection");

const OrderItem = sequelize.define("OrderItem", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  package:{
    type: DataTypes.STRING,
    allowNull: false,
  }

}, {
  tableName: "order_items",
  timestamps: true,
});



module.exports = OrderItem;