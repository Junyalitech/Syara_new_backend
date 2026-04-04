// routes/contactInfoRoutes.js

const express = require('express');
const router = express.Router();
const { addPincode, updatePincode, deletePincode, getAllPincodes, getDeliveryByPincode, verifyPincode } = require('../controllers/TransportController');


router.get("/get-pincodes-at-admin", getAllPincodes);
router.post("/verify-pincode", verifyPincode);
router.post("/add-pincode", addPincode);
router.get("/delivery/:pincode", getDeliveryByPincode);
router.put("/update-pincode/:pincode", updatePincode);
router.delete("/delete-pincode/:pincode", deletePincode);

module.exports = router;
