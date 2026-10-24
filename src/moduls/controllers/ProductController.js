const Product = require('../models/Product');
const sequelize = require("../../db/dbConnection");
const Category = require('../models/Category');
const ProductVariant = require("../models/ProductVariant");
const { parseVariants } = require("../utils/productVariants");
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

const PRODUCT_FIELDS = [
  "productName",
  "description",
  "nickname1",
  "nickname2",
  "nickname3",
  "video",
  "recipe",
  "productNamealsoyoumaylike",
  "link",
  "restriction",
  "type",
  "is_liquid",
  "newLaunch",
  "OurComOffer",
  "rating",
  "review",
  "status",
];

const IMAGE_FIELDS = [
  "image1",
  "image2",
  "image3",
  "image4",
  "image5",
];

function getUploadedImages(files = {}) {
  const images = {};

  for (const field of IMAGE_FIELDS) {
    if (files[field]?.length) {
      images[field] = files[field][0].filename;
    }
  }

  return images;
}

function getProductFields(body) {
  const fields = {};

  for (const field of PRODUCT_FIELDS) {
    if (body[field] !== undefined) {
      fields[field] = body[field];
    }
  }

  if (fields.productName) {
    fields.slug = slugify(fields.productName, {
      lower: true,
      strict: true,
    });
  }

  return fields;
}

const activeVariantsInclude = {
  model: ProductVariant,
  as: "variants",
  where: { status: "active" },
  required: false,
};


const productController = {
  createProduct: async (req, res) => {
    let transaction;

    try {
      const { productName, categoryId } = req.body;

      if (!productName || !categoryId) {
        return res.status(400).json({
          success: false,
          message: "Product name and category are required.",
        });
      }

      // Preserve the existing requirement for image1.
      if (!req.files?.image1?.length) {
        return res.status(400).json({
          success: false,
          message: "Please upload at least one image.",
        });
      }

      const variants = parseVariants(req.body.variants);

      const category = await Category.findByPk(categoryId);

      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Category not found.",
        });
      }

      transaction = await sequelize.transaction();

      const product = await Product.create(
        {
          ...getProductFields(req.body),
          categoryId,
          ...getUploadedImages(req.files),
        },
        { transaction }
      );

      await ProductVariant.bulkCreate(
        variants.map(({ quantity, unit, price, sellingPrice, stock, sku }) => ({
          productId: product.id,
          quantity,
          unit,
          price,
          sellingPrice,
          stock,
          sku,
        })),
        { transaction }
      );

      await transaction.commit();

      const createdProduct = await Product.findByPk(product.id, {
        include: [
          {
            model: ProductVariant,
            as: "variants",
          },
        ],
      });

      return res.status(201).json({
        success: true,
        data: createdProduct,
        message: "Product created successfully.",
      });
    } catch (error) {
      if (transaction && !transaction.finished) {
        await transaction.rollback();
      }

      console.error("Create product error:", error);

      return res.status(400).json({
        success: false,
        message: error.message || "Failed to create product.",
      });
    }
  },


  updateProduct: async (req, res) => {
    let transaction;

    try {
      const { slug } = req.params;

      const product = await Product.findOne({
        where: { slug },
      });

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found.",
        });
      }

      const hasVariants = req.body.variants !== undefined;

      // When supplied, variants must contain the FULL desired list.
      const variants = hasVariants
        ? parseVariants(req.body.variants)
        : null;

      transaction = await sequelize.transaction();

      const updateFields = getProductFields(req.body);

      // Support categorySlug as in your previous controller,
      // and categoryId for clients that already send the ID.
      if (req.body.categorySlug !== undefined) {
        const category = await Category.findOne({
          where: { slug: req.body.categorySlug },
          transaction,
        });

        if (!category) {
          throw new Error("Category not found.");
        }

        updateFields.categoryId = category.id;
      } else if (req.body.categoryId !== undefined) {
        const category = await Category.findByPk(
          req.body.categoryId,
          { transaction }
        );

        if (!category) {
          throw new Error("Category not found.");
        }

        updateFields.categoryId = category.id;
      }

      Object.assign(updateFields, getUploadedImages(req.files));

      await product.update(updateFields, { transaction });

      if (hasVariants) {
        const existingVariants = await ProductVariant.findAll({
          where: { productId: product.id },
          transaction,
        });

        const existingById = new Map(
          existingVariants.map((v) => [String(v.id), v])
        );

        const submittedIds = new Set();

        for (const variant of variants) {
          const {
            id,
            quantity,
            unit,
            price,
            sellingPrice,
            stock,
            sku,
          } = variant;

          if (id != null) {
            const existing = existingById.get(String(id));

            if (!existing) {
              throw new Error(
                `Variant ${id} does not belong to this product.`
              );
            }

            if (submittedIds.has(String(id))) {
              throw new Error("Duplicate variant ID.");
            }

            submittedIds.add(String(id));

            await existing.update(
              {
                quantity,
                unit,
                price,
                sellingPrice,
                stock,
                sku,
                status: "active",
              },
              { transaction }
            );
          } else {
            await ProductVariant.create(
              {
                productId: product.id,
                quantity,
                unit,
                price,
                sellingPrice,
                stock,
                sku,
                status: "active",
              },
              { transaction }
            );
          }
        }

        // Deactivate omitted variants instead of deleting history.
        const omitted = existingVariants.filter(
          (v) => !submittedIds.has(String(v.id))
        );

        if (omitted.length) {
          await ProductVariant.update(
            { status: "deactive" },
            {
              where: {
                id: {
                  [Op.in]: omitted.map((v) => v.id),
                },
                productId: product.id,
              },
              transaction,
            }
          );
        }
      }

      await transaction.commit();

      const updatedProduct = await Product.findByPk(product.id, {
        include: [
          {
            model: ProductVariant,
            as: "variants",
          },
        ],
      });

      return res.status(200).json({
        success: true,
        data: updatedProduct,
        message: "Product updated successfully.",
      });
    } catch (error) {
      if (transaction && !transaction.finished) {
        await transaction.rollback();
      }

      console.error("Update product error:", error);

      return res.status(400).json({
        success: false,
        message: error.message || "Failed to update product.",
      });
    }
  },

  getProductsByCategorySlug: async (req, res) => {
    try {
      const { slug } = req.params;

      const category = await Category.findOne({
        where: {
          slug,
          status: "active",
        },
      });

      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }

      const products = await Product.findAll({
        where: {
          categoryId: category.id,
          status: "active",
        },
        include: [activeVariantsInclude],
        order: [["productName", "ASC"]],
      });

      return res.status(200).json({
        success: true,
        category,
        products,
      });
    } catch (error) {
      console.error("Error while getting products:", error);

      return res.status(500).json({
        success: false,
        message: "Error while getting products",
      });
    }
  },

  deleteProduct: async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
      const { id } = req.params;

      const product = await Product.findByPk(id, { transaction });

      if (!product) {
        await transaction.rollback();

        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      await product.update(
        { status: "deactive" },
        { transaction }
      );

      await ProductVariant.update(
        { status: "deactive" },
        {
          where: {
            productId: product.id,
            status: "active",
          },
          transaction,
        }
      );

      await transaction.commit();

      return res.status(200).json({
        success: true,
        message: "Product and its variants deactivated successfully",
      });
    } catch (error) {
      if (!transaction.finished) {
        await transaction.rollback();
      }

      console.error("Error deactivating product:", error);

      return res.status(500).json({
        success: false,
        message: "Error while deactivating product",
      });
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const products = await Product.findAll({
        where: { status: "active" },
        include: [activeVariantsInclude],
        order: [["productName", "ASC"]],
      });

      return res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      console.error("Error fetching products:", error);

      return res.status(500).json({
        success: false,
        message: "Error while fetching products",
      });
    }
  },


  getProduct: async (req, res) => {
    try {
      const { slug } = req.params;

      const product = await Product.findOne({
        where: {
          slug,
          status: "active",
        },
        include: [
          { model: Category },
          activeVariantsInclude,
        ],
      });

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      return res.status(200).json(product);
    } catch (error) {
      console.error("Error fetching product:", error);

      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },

  getProductsBySlugs: async (req, res) => {
    try {
      const { slugs } = req.body;

      if (!Array.isArray(slugs)) {
        return res.status(400).json({
          success: false,
          message: "slugs must be an array",
        });
      }

      const products = await Product.findAll({
        where: {
          slug: { [Op.in]: slugs },
          status: "active",
        },
        include: [activeVariantsInclude],
      });

      return res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      console.error("Error fetching products by slugs:", error);

      return res.status(500).json({
        success: false,
        message: "Error fetching products",
      });
    }
  },



  getNewLaunch: async (req, res) => {
    try {
      const newLaunches = await Product.findAll({
        where: {
          newLaunch: true,
          status: "active",
        },
        include: [
          {
            model: ProductVariant,
            as: "variants",
            where: { status: "active" },
            required: false,
          },
        ],
      });

      return res.status(200).json(newLaunches);
    } catch (error) {
      console.error("Error fetching new launches:", error);

      return res.status(500).json({
        success: false,
        message: "Error fetching new launches",
      });
    }
  },
  getOurComboOfer: async (req, res) => {
    try {
      const comboOffers = await Product.findAll({
        where: {
          OurComOffer: true,
          status: "active",
        },
        include: [
          {
            model: ProductVariant,
            as: "variants",
            where: { status: "active" },
            required: false,
          },
        ],
      });

      return res.status(200).json(comboOffers);
    } catch (error) {
      console.error("Error fetching combo offers:", error);

      return res.status(500).json({
        success: false,
        message: "Error fetching combo offers",
      });
    }
  },

  getTopRatedProducts: async (req, res) => {
    try {
      const highRatedProducts = await Product.findAll({
        where: {
          rating: { [Op.gte]: 4.5 },
          status: "active",
        },
        include: [activeVariantsInclude],
        order: [
          ["rating", "DESC"],
          ["id", "DESC"],
        ],
        limit: 5,
      });

      let products = highRatedProducts;

      if (products.length < 5) {
        const existingIds = products.map((p) => p.id);

        const otherProducts = await Product.findAll({
          where: {
            status: "active",
            ...(existingIds.length
              ? { id: { [Op.notIn]: existingIds } }
              : {}),
          },
          include: [activeVariantsInclude],
          order: [
            ["rating", "DESC"],
            ["id", "DESC"],
          ],
          limit: 5 - products.length,
        });

        products = [...products, ...otherProducts];
      }

      return res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      console.error("Error fetching top rated products:", error);

      return res.status(500).json({
        success: false,
        message: "Error fetching top rated products",
      });
    }
  },

  updateStockByAdmin: async (req, res) => {
    try {
      const { variantId } = req.params;
      const { stock } = req.body;

      if (
        stock === undefined ||
        stock === null ||
        !Number.isInteger(Number(stock)) ||
        Number(stock) < 0 ||
        String(stock).trim() === ""
      ) {
        return res.status(400).json({
          success: false,
          message: "Stock must be a non-negative integer",
        });
      }

      const variant = await ProductVariant.findByPk(variantId);

      if (!variant) {
        return res.status(404).json({
          success: false,
          message: "Product variant not found",
        });
      }

      await variant.update({
        stock: Number(stock),
      });

      return res.status(200).json({
        success: true,
        message: "Variant stock updated successfully",
        data: variant,
      });
    } catch (error) {
      console.error("Error updating variant stock:", error);

      return res.status(500).json({
        success: false,
        message: "Server error while updating stock",
      });
    }
  },

};



module.exports = productController;