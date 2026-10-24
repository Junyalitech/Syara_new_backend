
const { DataTypes } = require("sequelize");
const sequelize = require("../../db/dbConnection");
const Product = require("./Product");

const ProductVariant = sequelize.define(
  "ProductVariant",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "products",
        key: "id",
      },
      onDelete: "CASCADE",
    },

    quantity: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false,
      validate: {
        min: 0.001,
      },
    },

    unit: {
      type: DataTypes.ENUM("g", "kg", "ml", "l", "pcs"),
      allowNull: false,
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },

    sellingPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      validate: {
        min: 0,
      },
    },

    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        isInt: true,
      },
    },

    sku: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },

    status: {
      type: DataTypes.ENUM("active", "deactive"),
      allowNull: false,
      defaultValue: "active",
    },
  },
  {
    tableName: "product_variants",
    timestamps: true,
  }
);

Product.hasMany(ProductVariant, {
  foreignKey: "productId",
  as: "variants",
});

ProductVariant.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});

module.exports = ProductVariant;
