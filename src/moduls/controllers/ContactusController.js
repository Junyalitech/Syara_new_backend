const ContactUs = require('../models/Contactus');

// Create a new contact message
exports.createContact = async (req, res) => {
    try {
        const contact = await ContactUs.create(req.body);
        res.status(201).json(contact);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Retrieve all contact messages
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await ContactUs.findAll();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// update section start
// Update a specific contact message by ID
exports.updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, subject, message } = req.body;

        // Check if any of the fields are provided in the request
        if (!name && !email && !phone && !subject && !message) {
            return res.status(400).json({ error: 'No fields provided for update' });
        }

        // Update the contact message
        const [updated] = await ContactUs.update(
            { name, email, phone, subject, message },
            { where: { id } }
        );

        if (updated) {
            const updatedContact = await ContactUs.findByPk(id);
            if (updatedContact) {
                res.status(200).json(updatedContact);
            } else {
                res.status(404).json({ error: 'Contact not found' });
            }
        } else {
            res.status(404).json({ error: 'Contact not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Delete a specific contact message by ID
// Delete a contact message by ID
exports.deleteContact = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await ContactUs.destroy({ where: { id } });

        if (deleted) {
            res.status(200).json({ message: 'Deleted successfully' }); // Send 200 OK with a message
        } else {
            res.status(404).json({ error: 'Contact not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
