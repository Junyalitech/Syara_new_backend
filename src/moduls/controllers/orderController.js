// controllers/orderController.js

const sequelize = require("../../db/dbConnection");

const Order = require("../models/korderNew");
const OrderItem = require("../models/korderItems");
const Transportation = require("../models/Transort");
const Product = require("../models/Product");

const Razorpay = require("razorpay");
const crypto = require("crypto");
const { get } = require("http");
const User = require("../models/User");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});



const getShippingCharge = async (pincode, deliveryType) => {
  const transport = await Transportation.findOne({
    where: { pincode }
  });

  if (!transport) {
    throw new Error("Delivery not available on this pincode");
  }

  if (deliveryType === "free") {
    if (!transport.free_delivery_available) {
      throw new Error("Free delivery not available");
    }
    return {
      charge: transport.free_delivery_charge,
      time: transport.free_delivery_time
    };
  }

  if (deliveryType === "porter") {
    if (!transport.porter_available) {
      throw new Error("Porter not available");
    }
    return {
      charge: transport.porter_charge,
      time: transport.porter_time
    };
  }

  if (deliveryType === "road") {
    if (!transport.courier_road_available) {
      throw new Error("Road delivery not available");
    }
    return {
      charge: transport.courier_road_charge,
      time: transport.courier_road_time
    };
  }

  if (deliveryType === "air") {
    if (!transport.courier_air_available) {
      throw new Error("Air delivery not available");
    }
    return {
      charge: transport.courier_air_charge,
      time: transport.courier_air_time
    };
  }

  throw new Error("Invalid delivery type");
};





const createOrder = async (req, res) => {

  const t = await sequelize.transaction();

  try {
    const {
      userId,
      products,
      paymentType,
      pincode,
      address,
      deliveryType,
      subtotal,
      // deliveryTime
    } = req.body;

    console.log("Order Data:", req.body);

    if (!userId || !products || products.length === 0) {
      await t.rollback();
      return res.status(400).json({ message: "Invalid order data" });
    }


    for (let item of products) {

      const product = await Product.findOne({
        where: { id: item.productId },
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }

      if (product.stock < item.quantity) {
        throw new Error(`${product.productName} out of stock`);
      }
    }


    // let subtotal = 0;
    // products.forEach(item => {
    //   subtotal += item.price * item.quantity;
    // });


    const deliveryData = await getShippingCharge(pincode, deliveryType);

    const deliveryFee = deliveryData.charge;
    const deliveryTimeText = deliveryData.time; // "2-3 days"

    const getMaxDeliveryDays = (deliveryTime) => {
      const match = deliveryTime.match(/\d+/g); // [2, 3]
      if (!match) return 0;

      return Math.max(...match.map(Number)); // 3
    };

    const calculateDeliveryDate = (deliveryTime) => {
      const maxDays = getMaxDeliveryDays(deliveryTime);

      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + maxDays);

      return deliveryDate;
    };

    // ✅ Calculate final date
    const finalDeliveryDate = calculateDeliveryDate(deliveryTimeText);

    const grandTotal = subtotal + deliveryFee;

    let razorpayOrder = null;


    if (paymentType === "Online") {
      razorpayOrder = await razorpay.orders.create({
        amount: Math.round(grandTotal * 100),
        currency: "INR",
        receipt: "receipt_" + Date.now(),
      });
    }


    const order = await Order.create({
      userId,
      subtotal,
      grandTotal,
      transportationCost: deliveryFee,
      paymentType,
      paymentStatus: "Pending",
      razorpayOrderId: razorpayOrder?.id || null,
      deliveryType,
      deliveryTime : finalDeliveryDate.toISOString().split('T')[0], // Store as YYYY-MM-DD
      products,
      address
    }, { transaction: t });

    console.log("products:", products);


    const orderItems = products.map(item => ({
      orderId: order.orderId,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      package: item.package
    }));

    await OrderItem.bulkCreate(orderItems, { transaction: t });


    for (let item of products) {

      const product = await Product.findOne({
        where: { id: item.productId },
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      await product.update({
        stock: product.stock - item.quantity
      }, { transaction: t });
    }

    await t.commit();


    if (paymentType === "Online") {
      return res.json({
        success: true,
        message: "Order created, proceed to payment",
        order,
        razorpayOrder,

      });
    }

    return res.json({
      success: true,
      message: "Order placed successfully (COD)",
      order,
    });

  } catch (error) {
    await t.rollback();

    console.error("Create Order Error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature === razorpay_signature) {

      await Order.update(
        {
          paymentStatus: "Paid",
          orderStatus: "confirmed",
          razorpayPaymentId: razorpay_payment_id,
        },
        {
          where: { razorpayOrderId: razorpay_order_id },
        }
      );

      return res.json({
        success: true,
        message: "Payment verified",
      });

    } else {

      await Order.update(
        { paymentStatus: "Failed" },
        { where: { razorpayOrderId: razorpay_order_id } }
      );

      return res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Verification failed",
    });
  }
};




const getDeliveryOptions = async (req, res) => {
  try {
    const { pincode } = req.params;

    const transport = await Transportation.findOne({
      where: { pincode }
    });

    if (!transport) {
      return res.status(404).json({ message: "No delivery available" });
    }

    const options = [];

    if (transport.free_delivery_available) {
      options.push({ type: "free", charge: transport.free_delivery_charge });
    }

    if (transport.porter_available) {
      options.push({ type: "porter", charge: transport.porter_charge });
    }

    if (transport.courier_road_available) {
      options.push({ type: "road", charge: transport.courier_road_charge });
    }

    if (transport.courier_air_available) {
      options.push({ type: "air", charge: transport.courier_air_charge });
    }

    res.json({ options });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching delivery options",
    });
  }
};


const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
         {
          model: User,
          attributes: ["id", "name", "phone"], // 👈 important
        },
        {
          model: OrderItem,
          include: [Product],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json({
      success: true,
      count: orders.length,
      orders,
    });

  } catch (error) {
    console.error("Get All Orders Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.findAll({
      where: { userId },
      include: [
        {
          model: OrderItem,
          include: [Product],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json({
      success: true,
      count: orders.length,
      orders,
    });

  } catch (error) {
    console.error("Get User Orders Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



module.exports = {
  createOrder,
  verifyPayment,
  getDeliveryOptions,
  getAllOrders,
  getOrdersByUserId
};