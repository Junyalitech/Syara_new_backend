
const { DataTypes } = require("sequelize");
const sequelize = require("../../db/dbConnection");
const Category = require("./Category");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    slug: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: "id",
      },
    },

    description: DataTypes.TEXT,
    nickname1: DataTypes.STRING,
    nickname2: DataTypes.STRING,
    nickname3: DataTypes.STRING,

    video: DataTypes.STRING,
    recipe: DataTypes.STRING,
    productNamealsoyoumaylike: DataTypes.STRING,
    link: DataTypes.STRING,
    restriction: DataTypes.STRING,
    type: DataTypes.STRING,

    image1: DataTypes.STRING,
    image2: DataTypes.STRING,
    image3: DataTypes.STRING,
    image4: DataTypes.STRING,
    image5: DataTypes.STRING,

    is_liquid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    newLaunch: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    OurComOffer: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },

    review: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },

    status: {
      type: DataTypes.ENUM("active", "deactive"),
      allowNull: false,
      defaultValue: "active",
    },
  },
  {
    tableName: "products",
    timestamps: false,
  }
);

Product.belongsTo(Category, {
  foreignKey: "categoryId",
});

Category.hasMany(Product, {
  foreignKey: "categoryId",
});

module.exports = Product;
