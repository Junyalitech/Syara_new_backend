const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

sequelize.authenticate()
  .then(() => {
    console.log('✅ MySQL connected successfully.');
  })
  .catch(err => {
    console.error('❌ Unable to connect:', err);
  });


  
module.exports = sequelize;