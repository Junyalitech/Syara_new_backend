const { hashPassword, comparePassword } = require('../helpers/authHelper');
const userModel = require('../models/User');
const jwt = require('jsonwebtoken');

// Register Controller
const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, role } = req.body;

    if (!name || !email || !password || !phone || !address || !role) {
      return res.status(400).send({ error: "All fields are required" });
    }

    // Validate role
    if (role !== 'customer' && role !== 'merchant') {
      return res.status(400).send({ error: "Role must be 'customer' or 'merchant'" });
    }

    const existingUser = await userModel.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "User already registered. Please log in.",
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = await userModel.create({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      role, // Save the role
    });

    return res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in registration",
      error: error.message,
    });
  }
};

// Login Controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Email and password are required",
      });
    }

    // Check if user exists
    const user = await userModel.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    // Compare password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate token
    const token = jwt.sign({ _id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Send response
    return res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        id: user.id,
        role: user.role, // Include user role in the response
      },
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in login",
      error: error.message,
    });
  }
};

const logoutController = (req, res) => {
  res.status(200).send({
    success: true,
    message: "Logout successful",
  });
};

module.exports = {
  registerController,
  loginController,
  logoutController,
};
