const paymentModel = require('../models/Payment'); // Sequelize model

/** --------------------- PAYMENT APIS --------------------- **/

// 1️⃣ Add payment method
const addPaymentMethod = async (req, res) => {
  try {
    const { type, details, isDefault } = req.body;

    if (!type || !details) {
      return res.status(400).json({ success: false, message: "Type and details are required" });
    }

    // Reset previous default if this one is default
    if (isDefault) {
      await paymentModel.update(
        { isDefault: false },
        { where: { userId: req.params.id } }
      );
    }

    const payment = await paymentModel.create({
      userId: req.params.id,
      type,
      details,
      isDefault: !!isDefault
    });

    res.status(201).json({
      success: true,
      message: "Payment method added successfully",
      payment
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 2️⃣ Edit payment method
const editPaymentMethod = async (req, res) => {
  try {
    const { id, type, details, isDefault } = req.body;

    const payment = await paymentModel.findOne({ where: { id, userId: req.params.id } });
    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment method not found" });
    }

    if (isDefault) {
      await paymentModel.update(
        { isDefault: false },
        { where: { userId: req.params.id } }
      );
    }

    await payment.update({ type, details, isDefault: !!isDefault });

    res.json({
      success: true,
      message: "Payment method updated successfully",
      payment
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 3️⃣ Fetch all payment methods
const fetchAllPaymentMethods = async (req, res) => {
  try {
    const payments = await paymentModel.findAll({ where: { userId: req.params.id } });
    res.json({
      success: true,
      payments
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 4️⃣ Remove payment method
const removePaymentMethod = async (req, res) => {
  try {
    const { id } = req.body;

    const payment = await paymentModel.findOne({ where: { id, userId: req.params.id } });
    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment method not found" });
    }

    await payment.destroy();
    res.json({ success: true, message: "Payment method removed successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 5️⃣ Set default payment method
const setDefaultPaymentMethod = async (req, res) => {
  try {
    // const { cardId } = req.params.cardId;
    // console.log("Request to set default payment method with ID:", id); // DEV
    const payment = await paymentModel.findOne({ where: { id:req.params.cardId, userId: req.params.id } });
    // console.log("Setting default payment method:", payment); // DEV
    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment method not found" });
    }

    // Reset all previous defaults
    await paymentModel.update(
      { isDefault: false },
      { where: { userId: req.params.id } }
    );

    // Set this one as default
    await payment.update({ isDefault: true });

    res.json({
      success: true,
      message: "Default payment method set successfully",
      payment
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  addPaymentMethod,
  editPaymentMethod,
  fetchAllPaymentMethods,
  removePaymentMethod,
  setDefaultPaymentMethod
};