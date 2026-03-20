// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartNewController');

// Define the routes
router.post('/carts', cartController.createCart);          // Create a new cart
router.delete('/cart/:cartId/product1', cartController.deleteProduct1FromCart);
router.post('/cart/:cartId/product/insert/:position',cartController. insertProductAtPosition);
router.put('/cart/:cartId/product/update/:position', cartController. updateProductAtPosition);
// Route to get user cart by userId
router.get('/cart/:userId',cartController. getUserCart);

// Route to get cart with products by userId
router.get('/user/:userId',cartController. getCartWithProducts);
router.put('/api/cart/:cartId',cartController. updateCart);
router.delete('/remove-product/:userId/:productId',cartController.deleteProductFromCart);
router.put('/update-quantity/:userId/:productId',cartController. updateProductQuantity);

router.post('/api/chcek-pincode-on-cart', cartController.addPincodesOnCart);          // Create a new cart


module.exports = router;
