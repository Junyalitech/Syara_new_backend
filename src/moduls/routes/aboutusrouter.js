const express = require('express');
const router = express.Router();
const upload = require('../image-file/index'); // Assuming this is a configured multer instance
const imageController = require('../controllers/aboutuse');
const contactController=require('../controllers/ContactusController');
router.post('/our-mission', upload.single('image'), imageController.createOurMission);
router.get('/our-mission/api', imageController.getOurMission);


router.post('/our-approach', upload.single('image'), imageController.createOurApproach);
router.get('/our-approach/api', imageController.getOurApproach);



router.post('/company-profile', upload.single('image'), imageController.createOurCompanyProfile);
router.get('/company-profile/api', imageController.getOurCompanyProfile);




router.post('/director-profile', upload.single('image'), imageController.createOurDirectorProfile);
router.get('/director-profile/api', imageController.getOurDirectorProfile);


router.post('/director-managing-words',  imageController.createDirectorManagingWords);
router.get('/director-managing-words/api', imageController.getDirectorManagingWords);


router.post('/create-our-team', upload.single('image'), imageController.createTeamMember);
router.get('/create-our-team/api', imageController.getAllTeamMembers);

router.post('/create-why-syara-retails', upload.array('images', 10), imageController.createWhySyaraRetails);
router.get('/create-why-syara-retails/api', imageController.getWhySyaraRetils);


// start our blogs section
router.post('/our-blogs', upload.single('image'), imageController.createBlogs);
router.get('/our-blogs/api', imageController.getAllBogs);

router.delete('/blogs/:id', imageController.deleteBlog);

// Route to create a new contact message
router.post('/contact-us', contactController.createContact);

// Route to get all contact messages
router.get('/contact-us/api', contactController.getAllContacts);

// Update a specific contact message by ID
router.put('/contact-us/:id', contactController.updateContact);

// Delete a specific contact message by ID
router.delete('/contact-us/:id', contactController.deleteContact);
module.exports = router;
