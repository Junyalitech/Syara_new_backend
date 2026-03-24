const slugify = require('slugify'); // Correct import
const Category = require('../models/Category');
const { Op } = require('sequelize');

const Product = require('../models/Product')
const categoryController = {
    getAllCategories: async (req, res) => {
        try {
            const categories = await Category.findAll();
            res.json(categories);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    getCategoryById: async (req, res) => {
        try {
            const category = await Category.findByPk(req.params.id);
            if (category) {
                res.json(category);
            } else {
                res.status(404).json({ error: 'Category not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    createCategory: async (req, res) => {
       

        try {
            const { name, description } = req.body;
            const slug = slugify(name, { lower: true });

            let image = null;
            if (req.file) {
                image = req.file.filename; // Store the image filename
            }

            const category = await Category.create({ name, description, slug, image });
            res.status(201).json(category);
        } catch (err) {
            res.status(500).json({ error: err.message });
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
            const { name, description } = req.body;
    
            // Log incoming slug for debugging
            console.log('Incoming slug:', req.params.slug);
    
            // Find the category by the old slug (using req.params.slug)
            const category = await Category.findOne({ where: { slug: req.params.slug } });
            
            if (!category) {
                console.error('Category not found for slug:', req.params.slug);
                return res.status(404).json({ success: false, message: 'Category not found' });
            }
    
            // Generate a new slug from the updated name
            const newSlug = slugify(name, { lower: true });
    
            // Handle the image file if it exists
            let image = category.image; // Keep the old image by default
            if (req.file) {
                image = req.file.filename; // Replace with the new uploaded image
            }
    
            // Update the category (including the slug and image)
            await Category.update(
                { name, description, slug: newSlug, image }, 
                { where: { slug: req.params.slug } } // Keep searching by the old slug
            );
    
            // Fetch the updated category to return in the response
            const updatedCategory = await Category.findOne({ where: { slug: newSlug } });
            res.status(200).json({ success: true, data: updatedCategory, message: 'Category updated successfully' });
        } catch (err) {
            console.error('Error updating category:', err.message);
            res.status(500).json({ success: false, message: err.message });
        }
    }
    ,
    deleteCategory: async (req, res) => {
        try {
            const deleted = await Category.destroy({ where: { id: req.params.id } });
            if (deleted) {
                res.status(204).json({ message: 'Category deleted' });
            } else {
                res.status(404).json({ error: 'Category not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getProductsBySlugs: async (req, res) => {
        try {
            const { slugs } = req.body; // Extract slugs from the request body

            // Find products where the slug is in the list of slugs
            const products = await Product.find({ slug: { $in: slugs } });

            res.status(200).json(products); // Send the products as JSON response
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error', error }); // Handle errors
        }
    },

    // Search controller
    searchItems: async (req, res) => {
        const { search } = req.query; // Get the search query from URL parameters
        try {
            // Perform case-insensitive search using LIKE operator
            const items = await Category.findAll({
                where: {
                    name: {
                        [Op.like]: `%${search}%` // Search for names containing the search term
                    }
                }
            });
            res.json(items); // Return the matched categories
        } catch (error) {
            console.error('Error occurred:', error); // Log error for debugging
            res.status(500).json({ message: 'Server error', error }); // Send error response
        }
    }
};
module.exports = categoryController;