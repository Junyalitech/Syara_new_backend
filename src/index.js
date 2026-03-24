const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./db/dbConnection');

const imageRoutes = require('./moduls/routes/image');
const categoryRoutes = require('./moduls/routes/CategoryRoutes');
const userRoutes = require('./moduls/routes/UserRoutes');
const allroutes = require('./moduls/routes/allroutes');
// ye hamri server file h 
const ordernew = require('./moduls/routes/order');
const cors = require("cors");
// Load environment variables from .env file  
require('dotenv').config();

const app = express();
app.use(bodyParser.json());


// CORS setup
const corsOptions = {
  origin: '*', // Adjust as needed
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));


app.use(cors()); // Enable 
// app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory
app.use('/public/userImages', express.static(path.join(__dirname, '../public/userImages')))

// Use routes
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

app.use(imageRoutes);
app.use(categoryRoutes);
app.use(userRoutes);
app.use(allroutes);
app.use('/api', ordernew);


const aboutus = require('./moduls/routes/aboutusrouter');
app.use(aboutus);





const cart = require('./moduls/routes/cartRouter');
app.use(cart);




const PORT = process.env.PORT || 8000;

// require('./moduls/models/image');
// Sync database and start the server
sequelize.sync().then(() => {
  console.log('✅ All tables created');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Failed to connect to the database:', error);
});
