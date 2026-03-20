const express = require('express');
const router = express.Router();
const User2 = require('../controllers/UserController');
//jo main website p ragister kr rha h uske leye ragistration h 
router.post('/registeruser', User2.registerController);
 


//LOGIN ROUTES
//ye wala main website p jo user login kr rha h uske leye h 
router.post("/login",User2.loginController);

router.post('/logout',User2. logoutController);

module.exports = router;
