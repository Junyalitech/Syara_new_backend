const { hashPassword, comparePassword } = require('../helpers/authHelper');
const userModel = require('../models/User');
const jwt = require('jsonwebtoken');
// const { sendOTP } = require('../utils/smsHelper');
const http = require('https');

const SendOTP = (template_id, phone, otp) => {
  return new Promise((resolve, reject) => {

    const data = JSON.stringify({
      template_id: template_id,   // from MSG91
      short_url: "0",
      recipients: [
        {
          mobiles: `91${phone}`,       // user phone number
          OTP: otp                  // your generated OTP
        }
      ]
    });

    const options = {
      method: 'POST',
      hostname: 'control.msg91.com',
      port: null,
      path: '/api/v5/flow',
      headers: {
        accept: 'application/json',
        authkey: process.env.SMS_AUTH_KEY,
        'content-type': 'application/json',
        'content-length': data.length
      }
    };



    const req = http.request(options, function (res) {
      let response = '';
      //   const chunks = [];

      res.on('data', function (chunk) {
        // chunks.push(chunk);
        response += chunk.toString();
      });

      res.on('end', function () {
        // const body = Buffer.concat(chunks);
        // console.log(body.toString());
        resolve(response);
        console.log(response);
      });

      req.on('error', (error) => {
        reject(error);
        console.error(error);
      });
    });

    req.write(data);
    req.end();

  });
};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
// Register Controller
const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, role, pincode } = req.body;

    if (!name || !email || !password || !phone || !role) {
      return res.status(400).send({ error: "All fields are required" });
    }

    // Validate role
    if (role !== 'customer' && role !== 'merchant') {
      return res.status(400).send({ error: "Role must be 'customer' or 'merchant'" });
    }

    const existingUser = await userModel.findOne({ where: { phone } });

    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "User already registered. Please log in.",
      });
    }

    const hashedPassword = await hashPassword(password);

    // ✅ OTP generate
    const otp = generateOTP();

    const user = await userModel.create({
      name,
      email,
      phone,
      pincode,
      address: address || 'NA', // Make address optional
      password: hashedPassword,
      role, // Save the role
      otp,
      otpExpiry: new Date(Date.now() + 5 * 60 * 1000), // 5 min
      isVerified: false
    });

    console.log("otp", otp);
    const template_id = process.env.REG_TEMP_ID; // Get template ID from env
    //send OTP
    try {
      const smsResponse = await SendOTP(template_id, phone, otp);
      console.log("SMS Response:", smsResponse);
    } catch (err) {
      console.error("SMS Error:", err);
    }


    console.log("User OTP:", otp);

    return res.status(201).send({
      success: true,
      message: "User registered successfully.  OTP sent.",
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


// const verifyOtpController = async (req, res) => {
//   try {
//     const { phone, otp } = req.body;

//     if (!phone || !otp) {
//       return res.status(400).send({
//         success: false,
//         message: "Phone and OTP are required",
//       });
//     }

//     const user = await userModel.findOne({ where: { phone } });

//     if (!user) {
//       return res.status(404).send({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // ❌ Wrong OTP
//     if (user.otp !== otp) {
//       return res.status(400).send({
//         success: false,
//         message: "Invalid OTP",
//       });
//     }

//     // ❌ Expired OTP
//     // if (new Date() > new Date(user.otpExpiry)) {
//     //   return res.status(400).send({
//     //     success: false,
//     //     message: "OTP expired",
//     //   });
//     // }

//     // ✅ Success → verify user
//     user.isVerified = true;
//     user.otp = null;
//     user.otpExpiry = null;

//     await user.save();

//     return res.status(200).send({
//       success: true,
//       message: "OTP verified successfully",
//     });

//   } catch (error) {
//     console.error(error);
//     return res.status(500).send({
//       success: false,
//       message: "Error verifying OTP",
//       error: error.message,
//     });
//   }
// };
// Login Controller

const loginController = async (req, res) => {
  try {
    const { phone, password } = req.body;

    // Validation
    if (!phone || !password) {
      return res.status(400).send({
        success: false,
        message: "Phone and password are required",
      });
    }

    // Check if user exists
    const user = await userModel.findOne({ where: { phone } });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Phone is not registered",
      });
    }

    // 🔥 NEW: Check if user is verified
    if (!user.isVerified) {
      return res.status(403).send({
        success: false,
        message: "Please verify your account via OTP Login.",
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
        pincode: user.pincode,
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

// controllers/authController.js

const loginSendOtpController = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).send({
        success: false,
        message: "Phone number is required",
      });
    }

    const user = await userModel.findOne({ where: { phone } });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // 🔥 Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // ⏳ Expiry (5 min)
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    // 💾 Save in DB
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // 📲 Send OTP (MSG91 / Twilio)

    console.log("OTP:", otp); // replace with SMS service
    const template_id = process.env.LOGIN_TEMP_ID; // Get template ID from env
    //send OTP
    try {
      const smsResponse = await SendOTP(template_id, phone, otp);
      console.log("SMS Response:", smsResponse);
    } catch (err) {
      console.error("SMS Error:", err);
    }


    return res.status(200).send({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error sending OTP",
    });
  }
};

const logoutController = (req, res) => {
  res.status(200).send({
    success: true,
    message: "Logout successful",
  });
};

const addAddressController = async (req, res) => {
  try {
    const userId = req.params.id;
    const { updateaddress } = req.body;

    // ✅ correct validation
    if (!updateaddress) {
      return res.status(400).json({ message: "Address is required" });
    }

    const user = await userModel.findByPk(userId);



    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Before:", user.toJSON());

    console.log("Incoming:", updateaddress);

    let addresses = user.updateaddress || [];

    // ✅ correct max 5 check
    if (addresses.length >= 5) {
      return res.status(400).json({
        success: false,
        message: "Maximum 5 addresses allowed"
      });
    }

    addresses.push({
      id: Date.now().toString(), // ✅ ADD THIS
      ...updateaddress
    });

    console.log("Saving:", addresses);

    await userModel.update(
      { updateaddress: addresses },
      { where: { id: userId } }
    );

    const updatedUser = await userModel.findByPk(userId);
    console.log("Saved DB value:", updatedUser.updateaddress);

    res.status(200).json({
      success: true,
      message: "Address added successfully",
      data: addresses
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const verifyOtpController = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const user = await userModel.findOne({ where: { phone } });

    console.log("user", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ❌ wrong OTP
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // ❌ expired OTP
    if (new Date() > user.otpExpiry) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // ✅ verify
    await user.update({
      isVerified: true,
      otp: null,
      otpExpiry: null
    });

    res.json({
      success: true,
      message: "OTP verified successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        pincode: user.pincode,
        address: user.address,
        id: user.id,
        role: user.role, // Include user role in the response
      },
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const resendOtpController = async (req, res) => {
  try {
    const { phone } = req.body;

    const user = await userModel.findOne({ where: { phone } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = generateOTP();

    await user.update({
      otp,
      otpExpiry: new Date(Date.now() + 5 * 60 * 1000)
    });

    console.log("Resend OTP:", otp); // DEV

    

    res.json({
      success: true,
      message: "OTP resent successfully",
      otp // dev only
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const fetchProfileController = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findByPk(req.params.id, {
      attributes: { exclude: ['password', 'otp', 'otpExpiry'] }
    });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const editProfileController = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const user = await userModel.findByPk(req.params.id);

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    await user.update({ name, email, phone, address });

    res.json({ success: true, message: "Profile updated successfully", data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
const changePasswordController = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await userModel.findByPk(req.params.id);

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const isMatch = await comparePassword(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Old password is incorrect" });

    const hashed = await hashPassword(newPassword);
    await user.update({ password: hashed });

    res.json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
const fetchAllAddressesController = async (req, res) => {
  try {
    const user = await userModel.findByPk(req.params.id);
    console.log("User :", user); // DEV
    console.log("User addresses:", user.updateaddress); // DEV
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, addresses: user.updateaddress || [] });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};


const deleteAddressController = async (req, res) => {
  try {
    const { index } = req.body;
    const userId = req.params.id;

    const user = await userModel.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ Proper way to get JSON field
    let addresses = [...(user.getDataValue("updateaddress") || [])];

    console.log("Before deletion:", addresses);

    if (index < 0 || index >= addresses.length) {
      return res.status(400).json({
        success: false,
        message: "Address not found",
      });
    }

    console.log("Deleting:", addresses[index]);

    // ✅ Remove address
    addresses.splice(index, 1);

    // ✅ Force update
    user.setDataValue("updateaddress", addresses);
    await user.save();

    return res.json({
      success: true,
      message: "Address deleted",
      addresses,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


module.exports = {
  registerController,
  loginController,
  logoutController,
  addAddressController,
  verifyOtpController,
  fetchProfileController,
  editProfileController,
  changePasswordController,
  fetchAllAddressesController,
  deleteAddressController,
  resendOtpController,
  loginSendOtpController
};