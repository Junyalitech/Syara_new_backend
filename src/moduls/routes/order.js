const express = require('express');
const router = express.Router();
const orderController = require('../controllers/ordercontrollernew');
const { createOrder, verifyPayment, getAllOrders, getOrdersByUserId } = require('../controllers/orderController');


router.post('/createOrder', createOrder);
router.post('/verifyPayment', verifyPayment);
router.get("/getorders", getAllOrders); // admin
router.get("/getorders/:userId", getOrdersByUserId); // user
// Create a new Order
router.post('/ordernew/api', orderController.createOrder);
router.get('/user-orders/:userId',orderController.getUserOrders); // No need for a URL parameter

router.post('/verify-payment', orderController.verifyPayment);
router.get('/user-orders-by-order-id/:orderId',orderController.getOrderDetailsById); // No need for a URL parameter
// Correct the export here
module.exports = router;
