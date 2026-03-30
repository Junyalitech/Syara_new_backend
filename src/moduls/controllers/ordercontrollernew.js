const Cart = require('../models/CartNew');
// const Order = require('../models/orderNew');
const User = require('../models/User');
const Product = require('../models/Product')
const razorpay = require("../utils/razorpay");
// Create order and move cart data to the order
// const createOrder = async (req, res) => {
//     try {
//         const { userId, productIds } = req.body; // Receive userId and array of productIds

//         // 1. Find the cart items for the given user
//         const cartItems = await Cart.findAll({ where: { userId } }); // Assuming Cart2 is the correct model

//         if (cartItems.length === 0) {
//             return res.status(400).json({ message: 'No items found in cart for this user' });
//         }

//         let selectedProducts = [];
//         let productsToMove = {};
//         let totalQty = 0;

//         // 2. Iterate over the cart fields Product1, Product2, ... and match them with provided productIds
//         cartItems.forEach(item => {
//             productIds.forEach((productId, index) => {
//                 for (let i = 1; i <= 10; i++) {
//                     const productField = `Product${i}`;
//                     const qtyField = `Pro_Qty${i}`;

//                     if (item[productField] == productId) {
//                         selectedProducts.push({ productId: item[productField], quantity: item[qtyField] });
//                         productsToMove[`Product${index + 1}`] = item[productField];
//                         productsToMove[`Pro_Qty${index + 1}`] = item[qtyField];
//                         totalQty += item[qtyField];
//                     }
//                 }
//             });
//         });

//         if (selectedProducts.length === 0) {
//             return res.status(400).json({ message: 'No matching products found in the cart for the provided product IDs' });
//         }

//         // 3. Create the order with selected products
//         const newOrder = await Order.create({
//             userId: userId,
//             ...productsToMove, // Add the selected products (Product1, Product2, etc.)
//             subtotal: totalQty * 100, // Example subtotal, adjust calculation as needed
//             // Other necessary fields for Order (like address, payment type, etc.)
//         });

//         // 4. After creating the order, delete only the selected cart items for that user
//         // Loop over productIds and remove only those specific products from cart
//         let updateCartFields = {};
//         selectedProducts.forEach(product => {
//             for (let i = 1; i <= 10; i++) {
//                 const productField = `Product${i}`;
//                 const qtyField = `Pro_Qty${i}`;

//                 if (cartItems[0][productField] == product.productId) {
//                     updateCartFields[productField] = null; // Set the product to null
//                     updateCartFields[qtyField] = null; // Set the quantity to null
//                 }
//             }
//         });

//         // Update the cart by setting selected products to NULL
//         await Cart.update(updateCartFields, { where: { userId } });

//         res.status(201).json({
//             message: 'Order created successfully with selected products', orderId: newOrder.id, // Order ID
//             order: newOrder
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
// };


// new by k
const Order = require("../models/korderNew");
const OrderItem = require("../models/korderItems");

const createOrder = async (req, res) => {
  try {
    const { userId, products, paymentType } = req.body;

    // ✅ Validation
    if (!userId || !products || products.length === 0) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    // ✅ Calculate total
    let subtotal = 0;

    products.forEach((item) => {
      subtotal += item.price * item.quantity;
    });

    const deliveryFee = 0; // FREE
    const grandTotal = subtotal + deliveryFee;

    let razorpayOrder = null;

    // 🔵 ONLINE PAYMENT
    if (paymentType === "Online") {
      razorpayOrder = await razorpay.orders.create({
        amount: Math.round(grandTotal * 100), // paise
        currency: "INR",
        receipt: "receipt_" + Date.now(),
      });
    }

    // ✅ CREATE ORDER
    const order = await Order.create({
      userId,
      subtotal,
      grandTotal,
      transportationCost: deliveryFee,
      paymentType,
      paymentStatus: "Pending",
      razorpayOrderId: razorpayOrder?.id || null,
    });

    // ✅ CREATE ORDER ITEMS
    const orderItems = products.map((item) => ({
      orderId: order.orderId,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));

    await OrderItem.bulkCreate(orderItems);

    // 🧹 CLEAR CART (optional)
    await Cart.destroy({ where: { userId } });

    // 🟢 RESPONSE
    if (paymentType === "Online") {
      return res.status(200).json({
        message: "Order created, proceed to payment",
        order,
        razorpayOrder,
      });
    }

    res.status(201).json({
      message: "Order placed successfully (COD)",
      order,
    });

  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};


const verifyPayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    await Order.update(
      { paymentStatus: "Paid" },
      { where: { orderId } }
    );

    res.json({ message: "Payment successful" });

  } catch (error) {
    res.status(500).json({ message: "Payment verification failed" });
  }
};

const getUserOrders = async (req, res) => {
    const { userId } = req.params;

    try {
        // Fetching orders based only on userId without including User or Cart models
        const orders = await Order.findAll({
            where: { userId: userId }, // Fetching orders based on userId
            // No include for User and Cart
        });

        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders: ', error);
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};
// src/moduls/controllers/ordercontrollernew.js
// src/moduls/controllers/ordercontrollernew.js

// Function to extract product details from the order
// ye sara humne controller banaya h ki esme order id k through product k details bhi aa jye 

const extractProductDetails = (order) => {
    const productDetails = [];

    for (let i = 1; i <= 4; i++) { // Adjust based on your maximum number of products
        const productId = order[`Product${i}`];
        const quantity = order[`Pro_Qty${i}`];

        if (productId) {
            productDetails.push({ productId, quantity });
        }
    }

    return productDetails;
};

// Function to fetch products by their IDs
const fetchProductsByIds = async (productIds) => {
    try {
        const products = await Product.findAll({
            where: {
                id: productIds // Assuming 'id' is the primary key
            },
            attributes: ['id', 'productName', 'price', 'image1', 'status'], // Include status here

        });

        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

// Function to fetch user by userId
const fetchUserById = async (userId) => {
    try {
        const user = await User.findOne({
            where: { id: userId }, // Assuming 'id' is the primary key
            attributes: ['name', 'email', 'address', 'phone'], // Add more fields as needed
        });

        return user;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

// Assuming you have a way to get the status of each product
// Assuming you have a way to get the status of each product
const getOrderDetailsById = async (req, res) => {
    const { orderId } = req.params; // Assuming you're getting the orderId from URL params

    try {
        // Fetch order by ID
        const order = await Order.findOne({ where: { orderId } });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Fetch user by userId
        const user = await fetchUserById(order.userId); // Get user details using userId

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Extract product details
        const productDetails = extractProductDetails(order);
        const productIds = productDetails.map(detail => detail.productId);

        // Fetch products from the database
        const products = await fetchProductsByIds(productIds);

        // Combine the order and product details
        const formattedOrder = {
            orderId: order.orderId,
            userId: order.userId,
            subtotal: order.subtotal,
            user: {
                name: user.name, // Fetch actual user name from the database
                email: user.email, // Fetch actual user email from the database
                address: user.address, // Fetch actual user address from the database
                phone: user.phone,
            },
            products: productDetails.map(detail => {
                const product = products.find(p => p.id === detail.productId); // Use 'id' instead of 'productId'
                return {
                    productId: detail.productId,
                    productName: product ? product.productName : null,
                    price: product ? product.price : null,
                    image1: product ? product.image1 : null,
                    quantity: detail.quantity,
                    status: product ? product.status : 'Unknown', // Get status directly from the product
                };
            }),
        };

        res.status(200).json(formattedOrder);
    } catch (error) {
        console.error('Error fetching order with products:', error);
        res.status(500).json({ message: 'Error fetching order details', error: error.message });
    }
};




module.exports = { createOrder, verifyPayment, getUserOrders, getOrderDetailsById };


