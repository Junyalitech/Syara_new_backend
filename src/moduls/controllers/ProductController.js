const Product = require('../models/Product');
const Category = require('../models/Category');
const { Op } = require("sequelize");
const slugify = require('slugify');

const productController = {
  createProduct: async (req, res) => {
    try {
      console.log("Request Body:", req.body);
      console.log("Request Files:", req.files);

      if (!req.files || !req.files.image1 || !req.files.image2 || !req.files.image3 || !req.files.image4 || !req.files.image5) {
        return res.status(400).json({ success: false, message: "Please upload all five images." });
      }

      const {
        productName, categoryId, price, nickname1, nickname2, nickname3, restriction, type,
        packeoption1kg, packeoption500gm, packeoption1kgrate, packeoption500gmrate,
        description, video, recipe, productNamealsoyoumaylike, link, newLaunch, OurComOffer, stock, rating, review, oldPrice, is_liquid
      } = req.body;



      if (!productName || !categoryId || !price) {
        return res.status(400).json({ success: false, message: "Required fields are missing." });
      }

      const slug = slugify(productName, { lower: true });
      const image1 = req.files.image1[0].filename;
      const image2 = req.files.image2[0].filename;
      const image3 = req.files.image3[0].filename;
      const image4 = req.files.image4[0].filename;
      const image5 = req.files.image5[0].filename;

      const newProduct = await Product.create({
        productName,
        slug,
        categoryId,
        price,
        oldPrice,
        stock,
        rating,
        review,
        description,
        is_liquid,
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
        image1,
        image2,
        image3,
        image4,
        image5,
        newLaunch,
        OurComOffer
      });

      res.status(201).json({ success: true, data: newProduct, message: "Product created successfully." });
    } catch (error) {
      console.error("Error processing data:", error.message);
      res.status(500).json({ success: false, message: "Internal Server Error" });
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
      const deleted = await Product.destroy({ where: { id } });

      if (deleted) {
        res.status(204).json({ success: true, message: 'Product deleted' });
      } else {
        res.status(404).json({ success: false, message: 'Product not found' });
      }
    } catch (error) {
      console.error(`Error deleting product: ${error.message}`);
      res.status(500).json({ success: false, message: 'Error while deleting product' });
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const products = await Product.findAll();
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ success: false, message: "Error while fetching products" });
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
        where: { slug },
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
      const products = await Product.findAll({ where: { slug: slugs } });
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getNewLaunch: async (req, res) => {
    try {
      console.log('Fetching new launches...');
      const newLaunches = await Product.findAll({
        where: { newLaunch: true } // Or true
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
        where: { OurComOffer: true } // Or true
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
          }
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