const Product = require('../models/Product');
const Category = require('../models/Category');
const { Op } = require("sequelize");
const slugify = require('slugify');
const OrderItems = require('../models/korderItems');

const toNumberOrNull = (value) => {
  if (
    value === undefined ||
    value === null ||
    value === "" ||
    value === "null" ||
    value === "undefined"
  ) {
    return null;
  }

  const number = Number(value);

  return Number.isFinite(number) ? number : null;
};

const productController = {
  createProduct: async (req, res) => {
    try {
      console.log("Request Body:", req.body);
      console.log("Request Files:", req.files);

      // At least 1 image is required
      if (!req.files || !req.files.image1 || req.files.image1.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Please upload at least one image."
        });
      }

      const {
        productName,
        categoryId,
        price,
        nickname1,
        nickname2,
        nickname3,
        restriction,
        type,
        packeoption1kg,
        packeoption500gm,
        packeoption1kgrate,
        packeoption500gmrate,
        description,
        video,
        recipe,
        productNamealsoyoumaylike,
        link,
        newLaunch,
        OurComOffer,
        stock,
        rating,
        review,
        oldPrice,
        is_liquid,
        status
      } = req.body;

      if (!productName || !categoryId || !price) {
        return res.status(400).json({
          success: false,
          message: "Required fields are missing."
        });
      }

      // Maximum 5 images
      const imageFields = [
        "image1",
        "image2",
        "image3",
        "image4",
        "image5"
      ];

      const uploadedImages = [];

      imageFields.forEach((field) => {
        if (req.files[field] && req.files[field].length > 0) {
          uploadedImages.push(req.files[field][0].filename);
        }
      });

      if (uploadedImages.length > 5) {
        return res.status(400).json({
          success: false,
          message: "You can upload a maximum of 5 images."
        });
      }

      const slug = slugify(productName, { lower: true });

      const image1 = uploadedImages[0] || null;
      const image2 = uploadedImages[1] || null;
      const image3 = uploadedImages[2] || null;
      const image4 = uploadedImages[3] || null;
      const image5 = uploadedImages[4] || null;

      const newProduct = await Product.create({
        productName,
        slug,
        categoryId,
        price,
        oldPrice: toNumberOrNull(oldPrice),
        stock,

        // Default rating = 4
        rating: rating || 4,

        review,
        description,
        is_liquid,

        nickname1,
        nickname2,
        nickname3,

        packeoption1kg,
        packeoption500gm,
        packeoption1kgrate: toNumberOrNull(packeoption1kgrate),
        packeoption500gmrate: toNumberOrNull(packeoption500gmrate),


        video,
        recipe,
        productNamealsoyoumaylike,
        link,
        restriction,
        type,

        image1,
        image2,
        image3,
        image4,
        image5,

        newLaunch,
        OurComOffer,

        // Default status = active
        status: status || "active"
      });

      return res.status(201).json({
        success: true,
        data: newProduct,
        message: "Product created successfully."
      });

    } catch (error) {
      console.error("Error processing data:", error);

      return res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  },

  getProductsByCategorySlug: async (req, res) => {
    try {
      const categorySlug = req.params.slug;

      const category = await Category.findOne({ where: { slug: categorySlug } });
      if (!category) {
        return res.status(404).json({ success: false, message: 'Category not found' });
      }

      const products = await Product.findAll({ where: { categoryId: category.id } });
      res.status(200).json({ success: true, category, products });
    } catch (error) {
      console.error("Error while getting products:", error);
      res.status(500).json({ success: false, message: "Error while getting products" });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;

      // Deactivate product instead of deleting it
      const [updated] = await Product.update(
        {
          status: "deactive"
        },
        {
          where: { id }
        }
      );

      if (updated) {
        return res.status(200).json({
          success: true,
          message: "Product deactivated successfully"
        });
      }

      return res.status(404).json({
        success: false,
        message: "Product not found"
      });

    } catch (error) {
      console.error(`Error deactivating product: ${error.message}`);

      return res.status(500).json({
        success: false,
        message: "Error while deactivating product"
      });
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const products = await Product.findAll({
        where: {
          status: "active"
        }
      });

      res.status(200).json({
        success: true,
        data: products
      });

    } catch (error) {
      console.error("Error fetching products:", error);

      res.status(500).json({
        success: false,
        message: "Error while fetching products"
      });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { slug } = req.params;
      const {
        productName, categorySlug, price, nickname1, nickname2, nickname3, restriction, type,
        packeoption1kg, packeoption500gm, packeoption1kgrate, packeoption500gmrate,
        description, video, recipe, productNamealsoyoumaylike, link, newLaunch, OurComOffer, oldPrice, stock, rating, review,
      } = req.body;

      const product = await Product.findOne({ where: { slug } });
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }

      let categoryId;
      if (categorySlug) {
        const category = await Category.findOne({ where: { slug: categorySlug } });
        if (!category) {
          return res.status(404).json({ success: false, message: 'Category not found' });
        }
        categoryId = category.id;
      }

      const updateFields = {
        productName,
        slug: productName ? slugify(productName, { lower: true }) : product.slug,
        categoryId,
        price,
        oldPrice,
        stock,
        rating,
        review,
        description,
        nickname1,
        nickname2,
        nickname3,
        packeoption1kg,
        packeoption500gm,
        packeoption1kgrate,
        packeoption500gmrate,
        video,
        recipe,
        productNamealsoyoumaylike,
        link,
        restriction,
        type,
        newLaunch,
        OurComOffer
      };

      if (req.files) {
        if (req.files.image1) updateFields.image1 = req.files.image1[0].filename;
        if (req.files.image2) updateFields.image2 = req.files.image2[0].filename;
        if (req.files.image3) updateFields.image3 = req.files.image3[0].filename;
        if (req.files.image4) updateFields.image4 = req.files.image4[0].filename;
        if (req.files.image5) updateFields.image5 = req.files.image5[0].filename;
      }

      const [updated] = await Product.update(updateFields, { where: { slug } });
      if (updated) {
        const updatedProduct = await Product.findOne({ where: { slug } });
        res.status(200).json({ success: true, data: updatedProduct, message: 'Product updated successfully.' });
      } else {
        res.status(400).json({ success: false, message: 'Failed to update product' });
      }
    } catch (error) {
      console.error(`Error updating product: ${error.message}`);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  getProduct: async (req, res) => {
    try {
      const { slug } = req.params;
      const product = await Product.findOne({
        where: { slug, status: "active" },
        include: [{ model: Category }]
      });


      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json(product);
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  getProductsBySlugs: async (req, res) => {
    try {
      const slugs = req.body.slugs;
      const products = await Product.findAll({ where: { slug: slugs, status: "active" } });
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },



  getNewLaunch: async (req, res) => {
    try {
      console.log('Fetching new launches...');
      const newLaunches = await Product.findAll({
        where: { newLaunch: true, status: "active" } // Or true
      });
      console.log('New launches found:', newLaunches);
      res.status(200).json(newLaunches);
    } catch (error) {
      console.error('Error fetching new launches:', error);
      res.status(500).json({ message: 'Error fetching new launches', error });
    }
  },
  getOurComboOfer: async (req, res) => {
    try {
      console.log('Fetching new ourCombooofer...');
      const OurComOffer = await Product.findAll({
        where: { OurComOffer: true, status: "active" } // Or true
      });
      console.log('Ourcombooofer found:', OurComOffer);
      res.status(200).json(OurComOffer);
    } catch (error) {
      console.error('Error fetching new launches:', error);
      res.status(500).json({ message: 'Error fetching new launches', error });
    }
  },

  getTopRatedProducts: async (req, res) => {
    try {
      // Step 1: Get products with rating >= 4.5
      let highRatedProducts = await Product.findAll({
        where: {
          rating: {
            [Op.gte]: 4.5
          },
          status: "active"
        },
        order: [['rating', 'DESC']]
      });

      // Step 2: If less than 5, fetch more products
      if (highRatedProducts.length < 5) {
        const remainingCount = 5 - highRatedProducts.length;

        const otherProducts = await Product.findAll({
          where: {
            id: {
              [Op.notIn]: highRatedProducts.map(p => p.id)
            }
          },
          order: [['rating', 'DESC']],
          limit: remainingCount
        });

        highRatedProducts = [...highRatedProducts, ...otherProducts];
      }

      res.status(200).json({
        success: true,
        data: highRatedProducts
      });

    } catch (error) {
      console.error("Error fetching top rated products:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching top rated products"
      });
    }
  },

  updateStockByAdmin: async (req, res) => {
    try {
      const { productId } = req.params;
      const { stock } = req.body;

      const product = await Product.findByPk(productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      product.stock = stock;

      await product.save();

      res.json({
        message: "Stock updated successfully",
        product
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

};



module.exports = productController;