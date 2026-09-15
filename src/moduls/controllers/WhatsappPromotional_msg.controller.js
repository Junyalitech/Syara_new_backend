
const User = require("../models/User");
const { Op } = require("sequelize");
const { sendSpecialSaleOfferWhatsApp, sendNewArrivalsWhatsApp } = require("../utils/Whatsapp.sms.service");

const sendSpecialSaleOffer = async (req, res) => {
  try {
    const { discount } = req.body;

    if (!discount) {
      return res.status(400).json({
        success: false,
        message: "Discount is required",
      });
    }

    const users = await User.findAll({
      attributes: ["phone"],
      where: {
        phone: {
          [Op.ne]: null,
        },
      },
    });

    const phoneNumbers = users
      .map((user) => user.phone)
      .filter(Boolean);

    if (!phoneNumbers.length) {
      return res.status(404).json({
        success: false,
        message: "No customers found",
      });
    }

    const BATCH_SIZE = 500;

    let successfulBatches = 0;
    let failedBatches = 0;

    for (let i = 0; i < phoneNumbers.length; i += BATCH_SIZE) {
      const batch = phoneNumbers.slice(
        i,
        i + BATCH_SIZE
      );

      console.log(
        `Sending batch ${i / BATCH_SIZE + 1} - ${batch.length} customers`
      );

      const result = await sendSpecialSaleOfferWhatsApp({
        phoneNumbers: batch,
        discount,
      });

      if (result.success) {
        successfulBatches++;
      } else {
        failedBatches++;
      }
    }

    return res.json({
      success: true,
      message: "Special sale campaign processed",
      totalCustomers: phoneNumbers.length,
      successfulBatches,
      failedBatches,
      discount,
    });

  } catch (error) {
    console.error(
      "Special Sale Campaign Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


const sendNewArrivalsCampaign = async (req, res) => {
  try {

    // ==============================
    // GET CUSTOMERS
    // ==============================

    const users = await User.findAll({
      attributes: ["phone"],
      where: {
        phone: {
          [Op.ne]: null,
        },
      },
    });


    // ==============================
    // GET PHONE NUMBERS
    // ==============================

    const phoneNumbers = users
      .map((user) => String(user.phone).trim())
      .filter(Boolean);


    if (!phoneNumbers.length) {
      return res.status(404).json({
        success: false,
        message: "No customers found",
      });
    }


    // ==============================
    // BATCH CONFIG
    // ==============================

    const BATCH_SIZE = 500;

    let successfulBatches = 0;
    let failedBatches = 0;

    const failedBatchDetails = [];


    // ==============================
    // SEND BATCHES
    // ==============================

    for (let i = 0; i < phoneNumbers.length; i += BATCH_SIZE) {

      const batch = phoneNumbers.slice(
        i,
        i + BATCH_SIZE
      );

      const batchNumber =
        Math.floor(i / BATCH_SIZE) + 1;

      console.log(
        `New Arrivals: Sending batch ${batchNumber} | ${batch.length} customers`
      );


      try {

        const result = await sendNewArrivalsWhatsApp({
          phoneNumbers: batch,
        });


        if (result.success) {

          successfulBatches++;

          console.log(
            `New Arrivals: Batch ${batchNumber} sent successfully`
          );

        } else {

          failedBatches++;

          failedBatchDetails.push({
            batch: batchNumber,
            count: batch.length,
            error: result.error,
          });

          console.error(
            `New Arrivals: Batch ${batchNumber} failed`,
            result.error
          );
        }


      } catch (batchError) {

        failedBatches++;

        failedBatchDetails.push({
          batch: batchNumber,
          count: batch.length,
          error: batchError.message,
        });

        console.error(
          `New Arrivals: Batch ${batchNumber} error`,
          batchError
        );
      }
    }


    // ==============================
    // RESPONSE
    // ==============================

    return res.json({
      success: failedBatches === 0,

      message:
        failedBatches === 0
          ? "New arrivals campaign sent successfully"
          : "New arrivals campaign completed with some failed batches",

      totalCustomers: phoneNumbers.length,

      batchSize: BATCH_SIZE,

      totalBatches:
        Math.ceil(phoneNumbers.length / BATCH_SIZE),

      successfulBatches,

      failedBatches,

      failedBatchDetails,
    });


  } catch (error) {

    console.error(
      "New Arrivals Campaign Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


module.exports = {
  sendNewArrivalsCampaign,
  sendSpecialSaleOffer,
};