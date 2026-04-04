const express = require('express');
const router = express.Router();
const User2 = require('../controllers/UserController');

const payment = require('../controllers/paymentController');
const productController = require('../controllers/ProductController');
const { addPincode, updatePincode, deletePincode, getAllPincodes } = require('../controllers/TransportController');
//jo main website p ragister kr rha h uske leye ragistration h 
router.post('/registeruser', User2.registerController);
 


//LOGIN ROUTES
//ye wala main website p jo user login kr rha h uske leye h 
router.post("/login",User2.loginController);
router.put('/update-address/:id', User2.addAddressController)
router.post('/logout',User2. logoutController);
router.post('/verify-otp', User2.verifyOtpController);
router.post('/resend-otp', User2.resendOtpController);

router.get('/profile/:id', User2.fetchProfileController);


router.put('/profile/edit/:id', User2.editProfileController);


router.put('/profile/change-password/:id',User2.changePasswordController);



router.get('/fetch-addresses/:id', User2.fetchAllAddressesController);

router.delete('/delete-addresses/:id',User2.deleteAddressController);

router.post('/add-payment-methods/:id', payment.addPaymentMethod);


router.put('/edit-payment-methods/:id', payment.editPaymentMethod);

router.get('/all-payment-methods/:id', payment.fetchAllPaymentMethods);


router.delete('/remove-payment-methods/:id', payment.removePaymentMethod);


router.put('/set-default-payment-methods/:id/:cardId', payment.setDefaultPaymentMethod);




module.exports = router;
