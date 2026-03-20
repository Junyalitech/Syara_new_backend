const { DataTypes } = require('sequelize');
const sequelize = require('../../db/dbConnection');
const Category = require('./Category');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: true
  },
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: 'id'
    },
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  nickname1: {
    type: DataTypes.STRING,
    allowNull: true
  },
  nickname2: {
    type: DataTypes.STRING,
    allowNull: true
  },
  nickname3: {
    type: DataTypes.STRING,
    allowNull: true
  },
  packeoption1kg: {
    type: DataTypes.STRING,
    allowNull: true
  },
  packeoption500gm: {
    type: DataTypes.STRING,
    allowNull: true
  },
  packeoption1kgrate: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  packeoption500gmrate: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  video: {
    type: DataTypes.STRING,
    allowNull: true
  },
  recipe: {
    type: DataTypes.STRING,
    allowNull: true
  },
  productNamealsoyoumaylike: {
    type: DataTypes.STRING,
    allowNull: true
  },
  link: {
    type: DataTypes.STRING,
    allowNull: true
  },
  restriction: {
    type: DataTypes.STRING,
    allowNull: true
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true
  },
  image1: {
    type: DataTypes.STRING,
    allowNull: true
  },
  image2: {
    type: DataTypes.STRING,
    allowNull: true
  },
  image3: {
    type: DataTypes.STRING,
    allowNull: true
  },
  image4: {
    type: DataTypes.STRING,
    allowNull: true
  },
  image5: {
    type: DataTypes.STRING,
    allowNull: true
  },
  newLaunch: { // New field
    type: DataTypes.BOOLEAN,
    defaultValue: false // Default value if not specified
  },
  OurComOffer: { // New field
    type: DataTypes.BOOLEAN,
    defaultValue: false // Default value if not specified
  },
  status: {
        type: DataTypes.ENUM('Pending', 'Shipped', 'Delivered', 'Canceled'), // You can adjust these statuses as needed
        default: 'Pending', // Default status can be set to 'Pending'
    },
}, {
  tableName: 'products',
  timestamps: false
});

// Define associations
Product.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Product, { foreignKey: 'categoryId' });

module.exports = Product;
