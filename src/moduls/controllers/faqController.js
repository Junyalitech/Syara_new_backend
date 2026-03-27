const faqModel = require('../models/faq');


const addFaqController = async (req, res) => {
  try {
    const { question, answer } = req.body;

    // Validation
    if (!question || !answer) {
      return res.status(400).send({
        success: false,
        message: "Question and answer are required",
      });
    }

    // Check max limit
    const count = await faqModel.count();
    if (count >= 5) {
      return res.status(400).send({
        success: false,
        message: "Maximum 5 FAQs allowed",
      });
    }

    const faq = await faqModel.create({ question, answer });

    return res.status(201).send({
      success: true,
      message: "FAQ added successfully",
      data: faq,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in adding FAQ",
      error: error.message,
    });
  }
};



const getAllFaqController = async (req, res) => {
  console.log("✅ getFaqController HIT");
  try {
    const faqs = await faqModel.findAll({
      order: [['id', 'ASC']]
    });

    return res.status(200).send({
      success: true,
      count: faqs.length,
      data: faqs,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in fetching FAQs",
      error: error.message,
    });
  }
};






const updateFaqController = async (req, res) => {
  try {
    const { question, answer } = req.body;

    const faq = await faqModel.findByPk(req.params.id);

    if (!faq) {
      return res.status(404).send({
        success: false,
        message: "FAQ not found",
      });
    }

    await faq.update({ question, answer });

    return res.status(200).send({
      success: true,
      message: "FAQ updated successfully",
      data: faq,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in updating FAQ",
      error: error.message,
    });
  }
};



const deleteFaqController = async (req, res) => {
  try {
    const faq = await faqModel.findByPk(req.params.id);

    if (!faq) {
      return res.status(404).send({
        success: false,
        message: "FAQ not found",
      });
    }

    await faq.destroy();

    return res.status(200).send({
      success: true,
      message: "FAQ deleted successfully",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in deleting FAQ",
      error: error.message,
    });
  }
};


module.exports = {
  addFaqController,
  getAllFaqController,
  updateFaqController,
  deleteFaqController,
};