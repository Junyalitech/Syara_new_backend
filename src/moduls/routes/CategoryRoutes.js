const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');
const upload = require('../image-file/index');
const categoryController=require('../controllers/CategoryController')




// Get all categories
router.get('/categories', categoryController.getAllCategories);

// Get a single category by ID
router.get('/:id', categoryController.getCategoryById);

// Create a new category
router.post('/categories', upload.single('image'),categoryController.createCategory);

// Update an existing category by ID
router.put('/categories/:slug',upload.single('image'), categoryController.updateCategory);

// Delete a category by ID
router.delete('/categories/:id', categoryController.deleteCategory);
router.get('/search/api', categoryController.searchItems); // Search items by name
router.post('/add-category-type', upload.single('image'), categoryController.addCategoryType);

// Route to create a product
router.post('/products', upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
  { name: 'image4', maxCount: 1 },
  { name: 'image5', maxCount: 1 }
]), productController.createProduct);


router.get('/products/category/:slug', productController.getProductsByCategorySlug);

// Other routes...
router.get('/products/api', productController.getAllProducts);
// Create a new product
router.delete('/products/:id', productController.deleteProduct);
router.post('/products/slug', productController.getProductsBySlugs);

//update product routes

router.put('/products/:slug', productController.updateProduct);
router.get('/products/new-launch', productController.getNewLaunch);
router.get('/products/our-combo-offer', productController.getOurComboOfer);

router.get('/products/:slug', productController.getProduct);
router.get('/top-rated', productController.getTopRatedProducts);
///user routes 






//cart routes all
// Get cart items for a specific user
//router.get('/cart/:userId', cartController.getCartByUserId);


module.exports = router;
