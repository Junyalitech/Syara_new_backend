

const Transport = require("../models/Transort");

exports.addPincode = async (req, res) => {
  try {
    const {
      pincode,
      free_delivery_available,
      free_delivery_charge,
      porter_available,
      porter_charge,
      courier_road_available,
      courier_air_available,
      courier_air_charge,
      courier_road_charge
    } = req.body;

    
    const existing = await Transport.findOne({ where: { pincode } });

    if (existing) {
      return res.status(400).json({ message: "Pincode already exists" });
    }

    const data = await Transport.create({
      pincode,
      free_delivery_available,
      free_delivery_charge,
      porter_available,
      porter_charge,
      courier_air_available,
      courier_road_available,
      courier_air_charge,
      courier_road_charge
    });

    res.status(201).json({ message: "Pincode added successfully", data });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.updatePincode = async (req, res) => {
  try {
    const { pincode } = req.params;

    const transport = await Transport.findOne({ where: { pincode } });

    if (!transport) {
      return res.status(404).json({ message: "Pincode not found" });
    }

    await transport.update(req.body);

    res.json({ message: "Pincode updated successfully", transport });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.deletePincode = async (req, res) => {
  try {
    const { pincode } = req.params;

    const transport = await Transport.findOne({ where: { pincode } });

    if (!transport) {
      return res.status(404).json({ message: "Pincode not found" });
    }

    await transport.destroy();

    res.json({ message: "Pincode deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getAllPincodes = async (req, res) => {
  try {
    const data = await Transport.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getDeliveryByPincode = async (req, res) => {
  try {
    const { pincode } = req.params;

    if (!pincode) {
      return res.status(400).json({ message: "Pincode is required" });
    }

    const data = await Transport.findOne({
      where: { pincode }
    });

    if (!data) {
      return res.status(404).json({
        message: "Delivery not available for this pincode"
      });
    }

    const response = {
      pincode: data.pincode,
      delivery_options: {
        free_delivery: data.free_delivery_available
          ? {
              available: true,
              charge: data.free_delivery_charge
            }
          : { available: false },

        porter: data.porter_available
          ? {
              available: true,
              charge: data.porter_charge
            }
          : { available: false },

          courier_road: data.courier_road_available
          ? {
              available: true,
              charge: data.courier_road_charge
            }
          : { available: false },

          courier_air: data.courier_air_available
          ? {
              available: true,
              charge: data.courier_air_charge
            }
          : { available: false },
    
        
        
      }
    };

    return res.status(200).json({
      message: "Delivery details fetched successfully",
      data: response
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.verifyPincode = async (req, res) => {
  try {
    const { pincode } = req.body;

    // ✅ Basic validation  
    if (!pincode || !/^\d{6}$/.test(pincode)) {
      return res.status(400).json({
        valid: false,
        message: "Invalid pincode format"
      });
    }

    const exists = await Transport.findOne({
      where: { pincode }
    });

    if (!exists) {
      return res.status(404).json({
        valid: false,
        message: "Delivery not available in this pincode"
      });
    }

    return res.status(200).json({
      valid: true,
      message: "Pincode is serviceable",
      data: {
        pincode: exists.pincode
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ valid: false, message: "Server error" });
  }
};