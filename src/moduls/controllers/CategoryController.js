const slugify = require('slugify'); // Correct import
const Category = require('../models/Category');
const { Op } = require('sequelize');

const Product = require('../models/Product')
const categoryController = {
    getAllCategories: async (req, res) => {
        try {
            const categories = await Category.findAll({
                where: {
                    status: "active"
                }
            });

            res.json(categories);

        } catch (err) {
            res.status(500).json({
                error: err.message
            });
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const { id } = req.params;

            // Check if category exists
            const category = await Category.findOne({
                where: { id }
            });

            if (!category) {
                return res.status(404).json({
                    success: false,
                    message: "Category not found"
                });
            }

            // Deactivate category
            await Category.update(
                { status: "deactive" },
                {
                    where: { id }
                }
            );

            // Deactivate all products under this category
            await Product.update(
                { status: "deactive" },
                {
                    where: { categoryId: id }
                }
            );

            res.status(200).json({
                success: true,
                message: "Category and all products under it deactivated successfully"
            });

        } catch (err) {
            console.error("Error deactivating category:", err);

            res.status(500).json({
                success: false,
                error: err.message
            });
        }
    },
    createCategory: async (req, res) => {
        try {
            const { name, description, status, discount, type } = req.body;

            const slug = slugify(name, { lower: true });

            const image = req.files?.image?.[0]?.filename || null;
            const headerImage = req.files?.headerImage?.[0]?.filename || null;

            const category = await Category.create({
                name,
                description,
                slug,
                image,
                headerImage,
                status: status === 'deactive' ? 'deactive' : 'active',
                discount: discount ?? 0,
                type: type || 'Vegetable'
            });

            return res.status(201).json({
                success: true,
                data: category,
                message: 'Category created successfully.'
            });

        } catch (err) {
            console.error('Error creating category:', err);

            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
    },

    addCategoryType: async (req, res) => {
        try {
            const { name, description, type, status, discount } = req.body;

            // Basic validation
            if (!name || !type) {
                return res.status(400).json({ success: false, message: 'Name and type are required' });
            }

            const validTypes = ['Vegetable', 'Fruit'];
            if (!validTypes.includes(type)) {
                return res.status(400).json({ success: false, message: "Type must be 'Vegetable' or 'Fruit'" });
            }

            // Validate discount (dynamic upto 30%)
            let discountValue = 0;
            if (discount !== undefined) {
                if (isNaN(discount) || discount < 0 || discount > 30) {
                    return res.status(400).json({ success: false, message: 'Discount must be between 0 and 30' });
                }
                discountValue = discount;
            }

            // Handle image upload
            let image = null;
            if (req.file) {
                image = req.file.filename;
            }

            const slug = slugify(name, { lower: true });

            const newCategory = await Category.create({
                name,
                description: description || null,
                type,
                status: status !== undefined ? status : true,
                discount: discountValue,
                image,
                slug
            });

            res.status(201).json({
                success: true,
                message: 'Category added successfully',
                data: newCategory
            });

        } catch (err) {
            console.error('Error adding category:', err.message);
            res.status(500).json({ success: false, message: err.message });
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { name, description, status, discount, type } = req.body;

            const category = await Category.findOne({
                where: { slug: req.params.slug }
            });

            if (!category) {
                return res.status(404).json({
                    success: false,
                    message: 'Category not found'
                });
            }

            const newName = name ?? category.name;
            const newSlug = slugify(newName, { lower: true });

            const image =
                req.files?.image?.[0]?.filename ?? category.image;

            const headerImage =
                req.files?.headerImage?.[0]?.filename ?? category.headerImage;

            await category.update({
                name: newName,
                description: description ?? category.description,
                slug: newSlug,
                image,
                headerImage,
                status: status ?? category.status,
                discount: discount ?? category.discount,
                type: type ?? category.type
            });

            return res.status(200).json({
                success: true,
                data: category,
                message: 'Category updated successfully'
            });

        } catch (err) {
            console.error('Error updating category:', err);

            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }
    ,
    getCategoryBySlug: async (req, res) => {
        try {
            const { slug } = req.params;

            const category = await Category.findOne({
                where: { slug }
            });

            if (!category) {
                return res.status(404).json({
                    success: false,
                    message: 'Category not found'
                });
            }

            return res.status(200).json({
                success: true,
                data: category,
                message: 'Category fetched successfully'
            });

        } catch (err) {
            console.error('Error fetching category:', err);

            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
    },


    getProductsBySlugs: async (req, res) => {
        try {
            const { slugs } = req.body; // Extract slugs from the request body

            // Find products where the slug is in the list of slugs
            const products = await Product.find({
                slug: { $in: slugs }, where: {
                    status: "active"
                }
            });

            res.status(200).json(products); // Send the products as JSON response
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error', error }); // Handle errors
        }
    },

    // Search controller
    searchItems: async (req, res) => {

        const { search } = req.query;

        try {

            if (!search) {
                return res.status(400).json({
                    success: false,
                    message: "Search query is required"
                });
            }

            // Search Categories
            const categories = await Category.findAll({
                where: {
                    [Op.or]: [
                        {
                            name: {
                                [Op.like]: `%${search}%`
                            }
                        }
                    ],

                    status: "active"

                }
            });

            // Search Products
            const products = await Product.findAll({
                where: {
                    [Op.or]: [
                        {
                            productName: {
                                [Op.like]: `%${search}%`
                            }
                        },
                        {
                            nickname1: {
                                [Op.like]: `%${search}%`
                            }
                        },
                        {
                            nickname2: {
                                [Op.like]: `%${search}%`
                            }
                        },
                        {
                            nickname3: {
                                [Op.like]: `%${search}%`
                            }
                        }
                    ],
                    status: "active"
                }
            });

            return res.status(200).json({
                success: true,
                data: {
                    categories,
                    products
                }
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message: "Server error",
                error: error.message
            });

        }
    }
};


module.exports = categoryController;