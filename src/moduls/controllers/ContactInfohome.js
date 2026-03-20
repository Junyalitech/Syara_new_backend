// controllers/contactInfoController.js

const ContactInfo = require('../models/ContactInfohome');

// Create a new contact info entry (remove previous entries)
exports.createOrReplaceContactInfo = async (req, res) => {
  try {
    const { phone, email } = req.body;

    // Delete all existing entries
    await ContactInfo.destroy({
      where: {}, // Empty condition deletes all records in the table
    });

    // Create the new entry
    const newContactInfo = await ContactInfo.create({ phone, email });

    res.status(201).json({ message: 'Contact info replaced successfully', data: newContactInfo });
  } catch (error) {
    res.status(500).json({ message: 'Failed to replace contact info', error: error.message });
  }
};

// Get the latest contact info entry (assuming only one entry should exist)
exports.getContactInfo = async (req, res) => {
  try {
    const contactInfo = await ContactInfo.findOne();

    if (!contactInfo) {
      return res.status(404).json({ message: 'Contact info not found' });
    }

    res.status(200).json({ data: contactInfo });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch contact info', error: error.message });
  }
};

// Other controller methods remain the same
