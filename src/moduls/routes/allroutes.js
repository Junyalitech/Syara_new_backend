// routes/contactInfoRoutes.js

const express = require('express');
const router = express.Router();
const contactInfoController = require('../controllers/ContactInfohome');

// Route to create or replace contact info
router.post('/contact-info', contactInfoController.createOrReplaceContactInfo);

// Route to get the latest contact info
router.get('/contact-info/api', contactInfoController.getContactInfo);

module.exports = router;
