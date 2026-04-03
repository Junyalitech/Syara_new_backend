// routes/contactInfoRoutes.js

const express = require('express');
const router = express.Router();
const contactInfoController = require('../controllers/ContactInfohome');
const { addPincode, updatePincode, deletePincode, getAllPincodes, getDeliveryByPincode, verifyPincode } = require('../controllers/TransportController');

// Route to create or replace contact info
router.post('/contact-info', contactInfoController.createOrReplaceContactInfo);

// Route to get the latest contact info
router.get('/contact-info/api', contactInfoController.getContactInfo);

router.post("/add-pincode", addPincode);
router.put("/update-pincode/:pincode", updatePincode);
router.delete("/delete-pincode/:pincode", deletePincode);
router.get("/get-pincodes", getAllPincodes);
router.get("/delivery/:pincode", getDeliveryByPincode);
router.post("/verify-pincode", verifyPincode);

module.exports = router;
