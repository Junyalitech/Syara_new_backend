const axios = require("axios");

const MSG91_URL =
  "https://control.msg91.com/api/v5/whatsapp/whatsapp-outbound-template/";

const sendOrderPlacedWhatsApp = async ({
  phone,
  customerName,
  orderId,
  amount,
  deliveryDate,
}) => {
  try {
    const payload = {
      integrated_number: process.env.MSG91_WHATSAPP_NUMBER,
      recipient_number: phone,

      template: {
        name: "order_placed_confirmation",

        language: {
          code: "en",
          policy: "deterministic",
        },

        components: [
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: String(customerName),
              },
              {
                type: "text",
                text: String(orderId),
              },
              {
                type: "text",
                text: String(amount),
              },
              {
                type: "text",
                text: String(deliveryDate),
              },
            ],
          },
        ],
      },
    };

    const response = await axios.post(MSG91_URL, payload, {
      headers: {
        accept: "application/json",
        authkey: process.env.MSG91_AUTH_KEY,
        "content-type": "application/json",
      },
    });

    console.log("WhatsApp sent:", response.data);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error(
      "WhatsApp send failed:",
      error.response?.data || error.message
    );

    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
};

const sendOrderShippedWhatsApp = async ({
  phone,
  customerName,
  orderId,
}) => {
  try {
    const payload = {
      integrated_number: process.env.MSG91_WHATSAPP_NUMBER,

      recipient_number: phone,

      template: {
        name: "order_shipped",

        language: {
          code: "en",
          policy: "deterministic",
        },

        components: [
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: String(customerName),
              },
              {
                type: "text",
                text: String(orderId),
              },
            ],
          },
        ],
      },
    };

    const response = await axios.post(
      MSG91_URL,
      payload,
      {
        headers: {
          accept: "application/json",
          authkey: process.env.MSG91_AUTH_KEY,
          "content-type": "application/json",
        },
      }
    );

    console.log(
      `Order shipped WhatsApp sent for ${orderId}`,
      response.data
    );

    return {
      success: true,
      data: response.data,
    };

  } catch (error) {

    console.error(
      `Order shipped WhatsApp failed for ${orderId}:`,
      error.response?.data || error.message
    );

    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
};


module.exports = {
  sendOrderPlacedWhatsApp,
  sendOrderShippedWhatsApp,
};