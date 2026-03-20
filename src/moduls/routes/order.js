const express = require('express');
const router = express.Router();
const orderController = require('../controllers/ordercontrollernew');

// Create a new Order
router.post('/ordernew/api', orderController.createOrder);
router.get('/user-orders/:userId',orderController.getUserOrders); // No need for a URL parameter

router.get('/user-orders-by-order-id/:orderId',orderController.getOrderDetailsById); // No need for a URL parameter
// Correct the export here
module.exports = router;
