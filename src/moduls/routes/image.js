const express = require('express');
const router = express.Router();
const upload = require('../image-file/index');
const imageController = require('../controllers/uploadController');
const { getAllFaqController } = require('../controllers/faqController');

router.post('/upload', upload.single('image'), imageController.uploadImage);
router.get('/upload', imageController.getImages);


router.delete('/upload/:id',imageController. delete_user);
// create routes for newlaunch 
//ye puaaa newlaunch tha jiski need nhi h ab humko beflatu k ye esko remove krna h 
//craete routes for whychoose us  start section

router.post('/why-choose-us', upload.array('image', 5),imageController.createWhyChooseUs);
router.delete('/whychooseus/:id', imageController.deleteWhyChooseUs);

router.get('/why-choose-us', imageController.get_all_images);


// carte hall of frame section 
router.post('/hall-of-frame', upload.single('image'), imageController.hallofframe);
router.get('/hall-of-frame', imageController.get_hall_of_frame);
router.delete('/hall-of-frame/:id',imageController.delete_hallOfFrame)
// create testimonial start
router.post('/testimonial', imageController.createTestimonial);
router.get('/testimonial', imageController.get_testimonial);
router.delete('/testimonial/:id',imageController.delete_textimonial)


// create ourcombooffers section
//befaltu k ourcombooofer h eski ab need nhi h ye puaran wala h 


router.get('/new-fetch-all-faqs', getAllFaqController);

//create routes for sayara news
router.post('/syara-news', upload.single('image'), imageController.createSayaraNews);
router.get('/syara-news', imageController.getSayaraNews);
router.delete('/syara-news/:id',imageController.delete_sayaranews)
// user ragistered on the admin pannel
router.post('/register/user', imageController.registerUser);

// POST route for user login
//ye wala admin pannel k leye login h 
router.post('/login/user', imageController.loginUser);



// strat rout for all delivery option data 
// ye felatu k routes h eski koi jaruart nhi h ab 
router.post('/delivery-options',  imageController.createDeliveryOption);
router.get('/delivery-options',  imageController.getDeliveryOptions);
router.get('/delivery-options/:pincode',  imageController.getDeliveryOptionByPincode);
router.put('/delivery-options/:pincode',  imageController.updateDeliveryOption);
router.delete('/delivery-options/:pincode',  imageController.deleteDeliveryOption);
router.get('/type/:type',imageController.getDeliveryOptionByType);
// routes/transportationRoutes.js
router.post('/check-pincode',imageController. checkPincode);


module.exports = router;
