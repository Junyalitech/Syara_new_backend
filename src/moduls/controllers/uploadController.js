// src/moduls/controllers/uploadController.
const bcrypt = require('bcrypt'); // Make sure bcrypt is imported

const Image = require('../models/image');
const path = require('path');

const WhyChooseUs = require('../models/WhyChooseUs')

const HallOfFrame = require('../models/HallOfFrame')
const Testimonial = require('../models/Testimonial')

const SayarNews = require('../models/SayaraNews')

const User = require('../models/login');
const DeliveryOption=require('../models/trsanportation');
const TwoBanner = require('../models/twoBanner');
exports.uploadImage = async (req, res) => {
  try {
    // const { id } = req.body;
       const { title, subtitle, description, button } = req.body;


    const imagePath = req.file ? req.file.filename : null; // Handle image file path

    if (!imagePath) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

  

 const newImage = await Image.create({
      image: imagePath,
      title,
      subtitle,
      description,
      button
    });


    res.status(201).json({ message: 'Image uploaded successfully', image: newImage });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Failed to upload image', error: error.message });
  }
};

exports.getImages = async (req, res) => {
  try {
    const images = await Image.findAll();
    res.status(200).json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ message: 'Failed to fetch images', error: error.message });
  }
};



//delete image for home slider start

exports.delete_user = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming you pass user ID as a parameter

    // Delete user by ID
    const deletedUser = await Image.destroy({
      where: { id: userId }
    });

    if (deletedUser === 0) {
      return res.status(404).send({ success: false, message: "Image not found." });
    }

    res.status(200).send({ success: true, message: "Home slider images deleetd succesfully  deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

exports.createTwoBanner = async (req, res) => {
  try {
    // const { id } = req.body;
       const { title, subtitle, description, button } = req.body;


    const imagePath = req.file ? req.file.filename : null; // Handle image file path

    if (!imagePath) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

  

 const banner = await TwoBanner.create({
      image: imagePath,
      title,
      subtitle,
      description,
      button
    });


    res.status(201).json({ message: 'Image uploaded successfully', banner: banner });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Failed to upload image', error: error.message });
  }
};

exports.getTwoBanner = async (req, res) => {
  try {
    const banner = await TwoBanner.findAll();
    res.status(200).json(banner);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ message: 'Failed to fetch images', error: error.message });
  }
};
// Create a whychooseus with image
exports.createWhyChooseUs = async (req, res) => {
  try {
    // Extract text fields from the request body
    const { text1, text2, text3, text4, text5 } = req.body;

    // Define the folder path where images are stored
    const imagePath = 'public/userImages/'; // Adjust this path as per your folder structure

    // Map over the uploaded files and get their full paths
    const imageFilenames = req.files
      ? req.files.map(file => `${imagePath}${file.filename}`) // Combine path with filename
      : []; // Handle multiple files

    // Remove all existing entries (if you want to replace all)
    await WhyChooseUs.destroy({ where: {} });

    // Create a new WhyChooseUs entry
    const newWhyChooseUs = await WhyChooseUs.create({
      image: imageFilenames, // Store array of image paths
      text1: text1 || null,
      text2: text2 || null,
      text3: text3 || null,
      text4: text4 || null,
      text5: text5 || null
    });

    // Respond with success and the newly created entry
    res.status(201).json({ success: true, data: newWhyChooseUs, message: "Data replaced successfully." });
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.deleteWhyChooseUs = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the document by ID
    const entry = await WhyChooseUs.findByPk(id);

    if (!entry) {
      return res.status(404).json({ success: false, message: "Entry not found." });
    }

    // Delete the document
    await entry.destroy();

    res.status(200).json({ success: true, message: "Entry deleted successfully." });
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


// Function to get all images
exports.get_all_images = async (req, res) => {
  try {
    const topcat = await WhyChooseUs.findAll();
    res.status(200).json(topcat);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};
// start hall of frane controller

exports.hallofframe = async (req, res) => {
  try {
    const imagePath = req.file ? req.file.filename : null; // Handle image file path

   

    if (!imagePath) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Create a new record in the database
    const newImage = await HallOfFrame.create({  image: imagePath });

    res.status(201).json({ message: 'Image uploaded successfully', image: newImage });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Failed to upload image', error: error.message });
  }
};



//get allimages of haal of frame
// Function to get all images
exports.get_hall_of_frame = async (req, res) => {
  try {
    const topcat = await HallOfFrame.findAll();
    res.status(200).json(topcat);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};



// delete hall of frame images and text also
exports.delete_hallOfFrame = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming you pass user ID as a parameter

    // Delete user by ID
    const deletedUser = await HallOfFrame.destroy({
      where: { id: userId }
    });

    if (deletedUser === 0) {
      return res.status(404).send({ success: false, message: "Image not found." });
    }

    res.status(200).send({ success: true, message: "Hall of frame images deleetd succesfully  deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

// testimonial section start

exports.createTestimonial = async (req, res) => {
  try {
    const { testimonialdetails, testimonialname, } = req.body;

    // Create a new record
    const newTestimonial = await Testimonial.create({
      
      testimonialname,
     
      testimonialdetails
    });

    res.status(201).json(newTestimonial);
  } catch (error) {
    console.error('Error creating testimonial:', error);
    res.status(500).json({ message: 'Something went wrong', error });
  }
};
// get testimonial data start
exports.get_testimonial = async (req, res) => {
  try {
    const topcat = await Testimonial.findAll();
    res.status(200).json(topcat);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};
// delete data of testimonial
exports.delete_textimonial = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming you pass user ID as a parameter

    // Delete user by ID
    const deletedUser = await Testimonial.destroy({
      where: { id: userId }
    });

    if (deletedUser === 0) {
      return res.status(404).send({ success: false, message: "Image not found." });
    }

    res.status(200).send({ success: true, message: "Testimonial images deleetd succesfully  deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};


// our combo offers start section
// start syara vedios section 


//start controller for sayaranews 

exports.createSayaraNews = async (req, res) => {
  try {
    const { link } = req.body;
    const image = req.file ? req.file.filename : null; // Get the filename from the request

    // Create a new record
    const ourComboOffer = await SayarNews.create({
      image,
      link
    });

    res.status(201).json(ourComboOffer);
  } catch (error) {
    console.error('Error creating testimonial:', error);
    res.status(500).json({ message: 'Something went wrong', error });
  }
};
// get testimonial data start
exports.getSayaraNews = async (req, res) => {
  try {
    const topcat = await SayarNews.findAll();
    res.status(200).json(topcat);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};
//delete sayara news
exports.delete_sayaranews = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming you pass user ID as a parameter

    // Delete user by ID
    const deletedUser = await SayarNews.destroy({
      where: { id: userId }
    });

    if (deletedUser === 0) {
      return res.status(404).send({ success: false, message: "Image not found." });
    }

    res.status(200).send({ success: true, message: "Sayara News images deleetd succesfully  deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};



//start login users and ragisterd for used on in admin pannel

// Register a new user
exports.registerUser = async (req, res) => {
  const { username, password, name } = req.body;

  try {
    // Check if username already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create new user
    const newUser = await User.create({
      username,
      password: hashedPassword,
      name,
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Login user
// Login user
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare password with hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Successful login
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// start for the all delivery option data 
// Create a new delivery option
exports.createDeliveryOption = async (req, res) => {
  try {
    const deliveryOption = await DeliveryOption.create(req.body);
    res.status(201).json({ success: true, data: deliveryOption });
  } catch (error) {
    console.error('Error creating delivery option:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Get all delivery options
exports.getDeliveryOptions = async (req, res) => {
  try {
    const deliveryOptions = await DeliveryOption.findAll();
    res.status(200).json({ success: true, data: deliveryOptions });
  } catch (error) {
    console.error('Error fetching delivery options:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Get a single delivery option by pincode
exports.getDeliveryOptionByPincode = async (req, res) => {
  try {
    const { pincode } = req.params;
    const deliveryOption = await DeliveryOption.findOne({ where: { pincode } });
    if (!deliveryOption) {
      return res.status(404).json({ success: false, message: 'Delivery Option not found' });
    }
    res.status(200).json({ success: true, data: deliveryOption });
  } catch (error) {
    console.error('Error fetching delivery option:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Update a delivery option
exports.updateDeliveryOption = async (req, res) => {
  try {
    const { pincode } = req.params;
    let deliveryOption = await DeliveryOption.findOne({ where: { pincode } });
    if (!deliveryOption) {
      return res.status(404).json({ success: false, message: 'Delivery Option not found' });
    }
    deliveryOption = await deliveryOption.update(req.body);
    res.status(200).json({ success: true, data: deliveryOption });
  } catch (error) {
    console.error('Error updating delivery option:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Delete a delivery option
exports.deleteDeliveryOption = async (req, res) => {
  try {
    const { pincode } = req.params;
    const deliveryOption = await DeliveryOption.findOne({ where: { pincode } });
    if (!deliveryOption) {
      return res.status(404).json({ success: false, message: 'Delivery Option not found' });
    }
    await deliveryOption.destroy();
    res.status(200).json({ success: true, message: 'Delivery Option deleted' });
  } catch (error) {
    console.error('Error deleting delivery option:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// controllers/transportationController.js

// Controller function to check the pincode
// controllers/transportationController.js

// Controller function to check the pincode
exports.checkPincode = async (req, res) => {
  try {
    const { pincode } = req.body; // Retrieve the pincode from the request body

    // Find the data for the given pincode
    const pincodeInfo = await DeliveryOption.findOne({ where: { pincode } });

    if (pincodeInfo) {
      res.status(200).json({ success: true, data: pincodeInfo });
    } else {
      res.status(404).json({ success: false, message: 'Pincode not found' });
    }
  } catch (error) {
    console.error('Error finding pincode:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};


// Get delivery options by type
exports.getDeliveryOptionByType = async (req, res) => {
  try {
    const { type } = req.params;
    const deliveryOptions = await DeliveryOption.findAll({ where: { type } });
    if (deliveryOptions.length === 0) {
      return res.status(404).json({ success: false, message: 'No Delivery Options found for this type' });
    }
    res.status(200).json({ success: true, data: deliveryOptions });
  } catch (error) {
    console.error('Error fetching delivery options by type:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};