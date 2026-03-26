const Cart = require('../models/CartNew'); // Adjust if this is a default export
const User = require('../models/User'); // Ensure User model is correctly set up
const Product = require('../models/Product'); // Make sure to import the Product model
const { Sequelize } = require('sequelize');
const Transport=require("../models/trsanportation")
exports.createCart = async (req, res) => {
    try {
        const {
            userId,
            subtotal,
            discount_name,
            discount_amount,
            payment_status,
            Shipping_street,
            Shipping_city,
            Shipping_pincode,
            Shipping_state,
            Shipping_country,
            Shipping_contact,
            Shipping_person_name,
            tax,
            Grand_Total,
            delivery_date,
            Transportation_total_cost,
            Transportation_Type,
            // Include product IDs and quantities
            Product1, Pro_Qty1,
            Product2, Pro_Qty2,
            Product3, Pro_Qty3,
            Product4, Pro_Qty4,
            Product5, Pro_Qty5,
            Product6, Pro_Qty6,
            Product7, Pro_Qty7,
            Product8, Pro_Qty8,
            Product9, Pro_Qty9,
            Product10, Pro_Qty10,
        } = req.body;

        // Check if the user exists
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create an array to hold the product IDs and quantities
        const productEntries = [
            { id: Product1, qty: Pro_Qty1 },
            { id: Product2, qty: Pro_Qty2 },
            { id: Product3, qty: Pro_Qty3 },
            { id: Product4, qty: Pro_Qty4 },
            { id: Product5, qty: Pro_Qty5 },
            { id: Product6, qty: Pro_Qty6 },
            { id: Product7, qty: Pro_Qty7 },
            { id: Product8, qty: Pro_Qty8 },
            { id: Product9, qty: Pro_Qty9 },
            { id: Product10, qty: Pro_Qty10 },
        ];

        // Filter out null or undefined products
        const validProducts = productEntries.filter(product => product.id);

        // Log valid products to ensure they are captured correctly
        console.log('Valid Products:', validProducts);

        // Check if the user tries to add more than 10 products
        if (validProducts.length > 10) {
            return res.status(400).json({ message: 'You cannot add more than 10 products to the cart.' });
        }


         // Check if any product quantity exceeds 10
         for (const { qty } of validProducts) {
            if (qty > 10) {
                return res.status(400).json({ message: 'You cannot add more than 10 quantity for any product.' });
            }
        }
        // Validate each product ID
        for (const { id } of validProducts) {
            const product = await Product.findOne({ where: { id } });
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${id} not found` });
            }
        }

        // Check if the cart already exists for this user
        let cart = await Cart.findOne({ where: { userId } });

        if (cart) {
            // Update the existing cart
            cart.subtotal += subtotal; // Adjust subtotal if needed
            cart.Product1=Product1;
            cart.Product2=Product2;
            cart.Product3=Product3;
            cart.Product4=Product4;
            cart.Product5=Product5;
            cart.Product6=Product6;
            cart.Product7=Product7;
            cart.Product8=Product8;
            cart.Product9=Product9;
            cart.Product10=Product10;
            cart.Pro_Qty1=Pro_Qty1;
            cart.Pro_Qty2=Pro_Qty2;
            cart.Pro_Qty3=Pro_Qty3;
            cart.Pro_Qty4=Pro_Qty4;
            cart.Pro_Qty5=Pro_Qty5;
            cart.Pro_Qty6=Pro_Qty6;
            cart.Pro_Qty7=Pro_Qty7;
            cart.Pro_Qty8=Pro_Qty8;
            cart.Pro_Qty9=Pro_Qty9;
            cart.Pro_Qty10=Pro_Qty10;
            cart.discount_name = discount_name;
            cart.discount_amount = discount_amount;
            cart.payment_status = payment_status;
            cart.Shipping_street = Shipping_street;
            cart.Shipping_city = Shipping_city;
            cart.Shipping_pincode = Shipping_pincode;
            cart.Shipping_state = Shipping_state;
            cart.Shipping_country = Shipping_country;
            cart.Shipping_contact = Shipping_contact;
            cart.Shipping_person_name = Shipping_person_name;
            cart.tax = tax;
            cart.Grand_Total = Grand_Total;
            cart.delivery_date = delivery_date;
            cart.Transportation_total_cost = Transportation_total_cost;
            cart.Transportation_Type = Transportation_Type;

            // Initialize products array if it is undefined
            if (!cart.products) {
                cart.products = [];
            }

            // Update the products in the cart
            validProducts.forEach(({ id, qty }) => {
                const existingProduct = cart.products.find(product => product.id === id);
                if (existingProduct) {
                    existingProduct.qty += qty; // Update quantity if exists
                } else {
                    cart.products.push({ id, qty }); // Add new product
                }
            });

            await cart.save(); // Save updated cart to the database
            return res.status(200).json({ message: 'Cart updated successfully!', cart });
        } else {
            // Create a new cart
            cart = await Cart.create({
                time_stemp: new Date(),
                userId,
                products: validProducts, // Initialize products
                subtotal,
                discount_name,
                discount_amount,
                payment_status,
                Shipping_street,
                Shipping_city,
                Shipping_pincode,
                Shipping_state,
                Shipping_country,
                Shipping_contact,
                Shipping_person_name,
                tax,
                Grand_Total,
                delivery_date,
                Transportation_total_cost,
                Transportation_Type,
            });

            return res.status(201).json({ message: 'Cart created successfully!', cart });
        }
    } catch (error) {
        console.error('Error in createCart:', error);
        res.status(500).json({ message: 'Error creating cart', error: error.message });
    }
};


// controllers/cartController.

exports.deleteProduct1FromCart = async (req, res) => {
    try {
        const { cartId } = req.params; // Extract cartId from URL

        // Fetch the cart record based on cartId
        const cart = await Cart.findOne({ where: { cartId } });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Check if Product1 is already null
        if (cart.Product1 === null) {
            return res.status(404).json({ message: 'Product1 is already removed from the cart' });
        }

        // Update Product1 and Pro_Qty1 fields to NULL
        cart.Product1 = null;
        cart.Pro_Qty1 = null;

        // Save the changes to the database
        await cart.save();

        res.status(200).json({ message: 'Product1 removed from cart successfully!', cart });
    } catch (error) {
        console.error('Error in deleteProduct1FromCart:', error);
        res.status(500).json({ message: 'Error removing Product1 from cart', error: error.message });
    }
};

// controllers/cartController.js
exports.insertProductAtPosition = async (req, res) => {
    try {
        const { cartId, position } = req.params; // Extract cartId and position from URL
        const { productId, quantity } = req.body; // Product details to be inserted

        // Validate the position
        if (position < 1 || position > 10) {
            return res.status(400).json({ message: 'Invalid position. Position must be between 1 and 10.' });
        }

        // Fetch the cart record based on cartId
        const cart = await Cart.findOne({ where: { cartId } });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Check if there's enough room to add a new product
        if (cart[`Product10`] !== null) {
            return res.status(400).json({ message: 'Cart is full, cannot insert a new product.' });
        }

        // Shift products down from the specified position to make space for the new product
        for (let i = 10; i > position; i--) {
            cart[`Product${i}`] = cart[`Product${i - 1}`];
            cart[`Pro_Qty${i}`] = cart[`Pro_Qty${i - 1}`];
        }

        // Insert the new product at the specified position
        cart[`Product${position}`] = productId;
        cart[`Pro_Qty${position}`] = quantity;

        // Save the changes to the database
        await cart.save();

        res.status(200).json({ message: `Product inserted at position ${position} successfully!`, cart });
    } catch (error) {
        console.error('Error in insertProductAtPosition:', error);
        res.status(500).json({ message: 'Error inserting product into cart', error: error.message });
    }
};
// controllers/cartController.js
exports.updateProductAtPosition = async (req, res) => {
    try {
        const { cartId, position } = req.params; // Extract cartId and position from URL
        const { productId, quantity } = req.body; // Product details for updating

        // Validate the position
        if (position < 1 || position > 10) {
            return res.status(400).json({ message: 'Invalid position. Position must be between 1 and 10.' });
        }

        // Fetch the cart record based on cartId
        const cart = await Cart.findOne({ where: { cartId } });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Check if the specified position is already occupied by a product
        if (cart[`Product${position}`] === null) {
            return res.status(404).json({ message: `No product found at position ${position} to update.` });
        }

        // Update the product and quantity at the specified position
        cart[`Product${position}`] = productId;
        cart[`Pro_Qty${position}`] = quantity;

        // Save the changes to the database
        await cart.save();

        res.status(200).json({ message: `Product at position ${position} updated successfully!`, cart });
    } catch (error) {
        console.error('Error in updateProductAtPosition:', error);
        res.status(500).json({ message: 'Error updating product in cart', error: error.message });
    }
};
exports.getUserCart = async (req, res) => {
    const userId = req.params.userId;
  
    // Check if userId is provided
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
  
    try {
      // Fetch cart items for the given userId
      const cartItems = await Cart.findAll({
        where: { userId },
        include: [
          {
            model: User,
            attributes: ['name'],
          },
          {
            model: Product,
            attributes: ['productName', 'price', 'image1'],
          },
        ],
      });
  
      if (!cartItems.length) {
        return res.status(404).json({ message: 'No items found in your cart' });
      }
  
      res.status(200).json(cartItems); // Send cart items as response
    } catch (err) {
      console.error('Error fetching cart items:', err); // Log error for debugging
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // Controller to get cart with product details
  exports.getCartWithProducts = async (req, res) => {
    try {
        const userId = req.params.userId; // Assuming you'll pass userId as a parameter
        // Fetch the cart items for the given userId
        const carts = await Cart.findAll({
            where: { userId },
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Product,
                    attributes: ['productName', 'price', 'image1'],
                },
            ],
        });

        const productIds = [];
        carts.forEach(cart => {
            for (let i = 1; i <= 10; i++) {
                // Collect product IDs from cart
                if (cart[`Product${i}`]) productIds.push(cart[`Product${i}`]);
            }
        });

        // Ensure productIds is not empty before making a query
        let productDetails = [];
        if (productIds.length > 0) {
            // Use findAll if using Sequelize
            productDetails = await Product.findAll({
                where: {
                    id: productIds, // Match with Sequelize ID
                },
            });
        }

        // Create a response with cart data and populated products
        const cartData = carts.map(cart => {
            const products = [];
            for (let i = 1; i <= 10; i++) {
                if (cart[`Product${i}`]) {
                    // Find the product details
                    const productDetail = productDetails.find(prod => prod.id === cart[`Product${i}`]);

                    if (productDetail) {
                        products.push({
                            productId: cart[`Product${i}`],
                            quantity: cart[`Pro_Qty${i}`],
                            productName: productDetail.productName,
                            price: productDetail.price,
                            image: productDetail.image1,
                        });
                    }
                }
            }
            return {
                cartId: cart.cartId,
                userId: cart.userId,
                Shipping_street: cart.Shipping_street,
                Shipping_city: cart.Shipping_city,
                Shipping_state: cart.Shipping_state,
                Shipping_country: cart.Shipping_country,
                Shipping_contact: cart.Shipping_contact,
                Shipping_person_name: cart.Shipping_person_name,
                tax: cart.tax,
                Grand_Total: cart.Grand_Total,
                payment_status: cart.payment_status,
                products: products,
            };
        });

        return res.status(200).json(cartData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error });
    }
};
// Update Order function

// Assuming Express and necessary packages are already imported


exports.updateCart = async (req, res) => {
    // Retrieve cartId from route parameters
    const { cartId } = req.params; 
    const cartIdInt = parseInt(cartId, 10); // Parse cartId to integer

    // Check if cartId is valid
    if (isNaN(cartIdInt)) {
        return res.status(400).json({ message: 'Invalid cartId' });
    }

    // Destructure request body for update fields
    const {
        payment_status,
        Shipping_street,
        Shipping_city,
        Shipping_pincode,
        Shipping_state,
        Shipping_country,
        Shipping_contact,
        Shipping_person_name
    } = req.body;

    try {
        // Update the cart in the database
        const [updated] = await Cart.update(
            {
                payment_status,
                Shipping_street,
                Shipping_city,
                Shipping_pincode,
                Shipping_state,
                Shipping_country,
                Shipping_contact,
                Shipping_person_name,
            },
            {
                where: { cartId: cartIdInt },
                returning: true, // Return the updated instance
            }
        );

        // Check if the cart was found and updated
        if (updated === 0) {
            console.log(`No cart found with cartId: ${cartIdInt}`);
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Fetch the updated cart to send back in response
        const updatedCart = await Cart.findOne({ where: { cartId: cartIdInt } });
        
        // Respond with the updated cart
        res.status(200).json(updatedCart);
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ message: error.message });
    }
};


exports.deleteProductFromCart = async (req, res) => {
    const userId = req.params.userId; // Get userId from URL parameters
    const productId = Number(req.params.productId); // Convert productId to a number

    try {
        // Find the user's cart using userId
        const cart = await Cart.findOne({ where: { userId } });

        // Log the retrieved cart for debugging
        console.log('Retrieved Cart:', cart);

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found for this user' });
        }

        // Log the productId being checked
        console.log('Product ID to remove:', productId);

        // Check if the specified productId exists in the cart's product fields
        let productField = null;
        for (let i = 1; i <= 10; i++) { // Check Product1 to Product10
            const currentProduct = cart[`Product${i}`];

            // Log each product field being checked
            console.log(`Checking Product${i}:`, currentProduct);

            // Convert currentProduct to a number for comparison
            if (currentProduct && currentProduct === productId) {
                productField = `Product${i}`;
                break;
            }
        }

        // If the product is not found in the cart
        if (!productField) {
            console.log('Product not found in cart for userId:', userId);
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        // Remove the product by setting the field to NULL
        await cart.update({ [productField]: null });

        // Return the updated cart information
        const updatedCart = await Cart.findOne({ where: { userId } }); // Fetch the updated cart
        return res.json({ message: 'Product removed from cart successfully', updatedCart });
    } catch (error) {
        console.error('Error deleting product:', error);
        return res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};

exports.updateProductQuantity = async (req, res) => {
    try {
        const { userId, productId } = req.params; // Get userId and productId from params
        const { quantity } = req.body; // Get the new quantity from the request body

        // Check if the user exists
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the user's cart
        const cart = await Cart.findOne({ where: { userId } });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Iterate through product columns to find the matching product
        let productFound = false;

        // Check each Product and update quantity
        for (let i = 1; i <= 10; i++) {
            const productColumn = `Product${i}`;
            const quantityColumn = `Pro_Qty${i}`;

            if (cart[productColumn] == productId) {
                // Log the current quantity before updating
                console.log(`Current quantity for product ${productId}: ${cart[quantityColumn]}`);

                // Check if the new quantity exceeds 10
                if (quantity > 10) {
                    return res.status(400).json({ message: 'You cannot add more than 10 quantity for any product.' });
                }

                // Update the quantity for this product
                cart[quantityColumn] = quantity;

                // Log the new quantity after updating
                console.log(`Updated quantity for product ${productId}: ${cart[quantityColumn]}`);
                productFound = true;
                break;
            }
        }

        if (!productFound) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        // Save the updated cart
        await cart.save();

        // Log the entire cart state after the update
        console.log('Updated cart:', cart);

        return res.status(200).json({ message: 'Product quantity updated successfully', cart });
    } catch (error) {
        console.error('Error updating product quantity:', error);
        res.status(500).json({ message: 'Error updating product quantity', error: error.message });
    }
};


exports.addPincodesOnCart = async (req, res) => {
    const { pincode, userId } = req.body;

    function determineProductIndex(cart) {
        for (let i = 1; i <= 10; i++) {
            const productField = `Product${i}`;
            if (!cart[productField]) {
                return i; // Return the first available index
            }
        }
        return null; // No available index found (cart is full)
    }

    try {
        // Fetch available products for the given pincode
        const availableProducts = await Transport.findAll({ where: { pincode } });

        if (!availableProducts.length) {
            return res.status(404).json({ success: false, message: 'No products available for this pin code.' });
        }

        // Fetch the user's existing cart
        let cart = await Cart.findOne({ where: { userId, payment_status: 'Pending' } });

        if (!cart) {
            return res.status(404).json({ success: false, message: 'No existing cart found for this user.' });
        }

        let subtotal = cart.subtotal || 0; // Initialize subtotal from existing cart
        let totalWeight = 0; // Initialize total weight
        let transportCost = 0; // Initialize transport cost
        let cartType = ''; // Variable to hold transport type

        // Fetch delivery options for the provided pincode
        const deliveryOptions = await Transport.findOne({ where: { pincode } });

        // Check if delivery options are available
        if (!deliveryOptions) {
            return res.status(404).json({ success: false, message: 'No delivery options available for this pincode.' });
        }

        // Calculate transport cost based on unit weight and rate
        // Example: Assuming each product has a weight (this could be part of your product data)
        const unitWeight = 1; // Replace with actual weight logic or data from products
        const quantity = 1; // Replace with actual quantities in the cart if needed

        transportCost = deliveryOptions.rate * unitWeight * quantity; // Modify this formula based on your logic

        // Iterate over available products to update the cart
        for (const product of availableProducts) {
            const productFieldIndex = determineProductIndex(cart);
            if (productFieldIndex !== null) {
                const productFieldName = `Product${productFieldIndex}`;
                const quantityFieldName = `Pro_Qty${productFieldIndex}`;

                // Update the cart with product details
                await Cart.update(
                    { 
                        [productFieldName]: product.productId, 
                        [quantityFieldName]: 1 
                    },
                    { where: { cartId: cart.cartId } }
                );

                // Set transport cost and type based on the current product
                cartType = deliveryOptions.type; // Assuming type is fetched from delivery options
            }
        }

        // Calculate grand total by adding transportation cost to the subtotal
        const grandTotal = subtotal + transportCost;

        // Update the cart with the final values, including Shipping_pincode
        await Cart.update(
            { 
                subtotal, 
                Transportation_total_cost: transportCost, 
                Grand_Total: grandTotal, // Update the grand total
                type: cartType,
                Shipping_pincode: pincode // Update the Shipping_pincode field
            },
            { where: { cartId: cart.cartId } }
        );

        // Fetch the updated cart to return
        const updatedCart = await Cart.findOne({ where: { cartId: cart.cartId } });

        res.status(200).json({ success: true, message: 'Cart updated with transportation details successfully!', cart: updatedCart });

    } catch (error) {
        console.error('Error while updating the cart:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};





