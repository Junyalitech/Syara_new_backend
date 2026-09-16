// routes/contactInfoRoutes.js

const express = require('express');
const { sendNewArrivalsCampaign, sendSpecialSaleOffer, getWhatsAppLogsController } = require('../controllers/WhatsappPromotional_msg.controller');
const router = express.Router();

router.post(
  "/whatsapp/new-arrivals",
  sendNewArrivalsCampaign
);

router.get(
  "/wb_logs",
  getWhatsAppLogsController
);

router.post(
  "/whatsapp/special-sale",
  sendSpecialSaleOffer
);

module.exports = router;
