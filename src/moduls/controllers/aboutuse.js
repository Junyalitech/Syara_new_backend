const OurMission = require('../models/OurMission');
const OurApproach=require('../models/OurApproach');
const OurCompanyProfile=require('../models/CompanyProfile');
const OurDirectorProfile=require('../models/DirectorProfile');
const OurDirectorManagingWords=require('../models/DirectorManagingWords');
const OurTeam=require('../models/OurTeam');
const WhySyaraRetails=require('../models/WhySyaraRetils');
const OurBlogs = require('../models/ourBlogs');
exports.createOurMission = async (req, res) => {
    try {
        // Extract text fields from the request body
        const { text1, text2, text3, text4, text5, text6, text7, text8, text9, text10 } = req.body;

        // Handle the uploaded file and get its filename
        const imageFilename = req.file.filename; // Using single file upload

        // Remove all existing entries
        await OurMission.destroy({ where: {} });

        // Create a new OurMission entry
        const newOurMission = await OurMission.create({
            image: imageFilename, // Store the image filename
            text1,
            text2,
            text3,
            text4,
            text5,
            text6,
            text7,
            text8,
            text9,
            text10
        });

        // Respond with success and the newly created entry
        res.status(201).json({ success: true, data: newOurMission, message: "Data replaced successfully." });
    } catch (error) {
        console.error("Error processing data:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Controller for retrieving all OurMission entries
exports.getOurMission = async (req, res) => {
    try {
        const ourMissionData = await OurMission.findAll(); // Fetch all entries

        if (ourMissionData.length === 0) {
            return res.status(404).json({ success: false, message: "No data found." });
        }

        res.status(200).json({ success: true, data: ourMissionData });
    } catch (error) {
        console.error("Error retrieving data:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// start approach section
exports.createOurApproach = async (req, res) => {
    try {
        // Extract text fields from the request body
        const { text1, text2, text3, text4, text5, text6, text7, text8, text9, text10 } = req.body;

        // Handle the uploaded file and get its filename
        const imageFilename = req.file.filename; // Using single file upload

        // Remove all existing entries
        await OurApproach.destroy({ where: {} });

        // Create a new OurMission entry
        const newOurMission = await OurApproach.create({
            image: imageFilename, // Store the image filename
            text1,
            text2,
            text3,
            text4,
            text5,
            text6,
            text7,
            text8,
            text9,
            text10
        });

        // Respond with success and the newly created entry
        res.status(201).json({ success: true, data: newOurMission, message: "Data replaced successfully." });
    } catch (error) {
        console.error("Error processing data:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Controller for retrieving all OurMission entries
exports.getOurApproach = async (req, res) => {
    try {
        const ourMissionData = await OurApproach.findAll(); // Fetch all entries

        if (ourMissionData.length === 0) {
            return res.status(404).json({ success: false, message: "No data found." });
        }

        res.status(200).json({ success: true, data: ourMissionData });
    } catch (error) {
        console.error("Error retrieving data:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
// start OurCompanySection 
exports.createOurCompanyProfile = async (req, res) => {
    try {
        // Extract text fields from the request body
        const { text } = req.body;

        // Handle the uploaded file and get its filename
        const imageFilename = req.file.filename; // Using single file upload

        // Remove all existing entries
        await OurCompanyProfile.destroy({ where: {} });

        // Create a new OurMission entry
        const newOurMission = await OurCompanyProfile.create({
            image: imageFilename, // Store the image filename
            text,
           
        });

        // Respond with success and the newly created entry
        res.status(201).json({ success: true, data: newOurMission, message: "Data replaced successfully." });
    } catch (error) {
        console.error("Error processing data:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Controller for retrieving all OurMission entries
exports.getOurCompanyProfile = async (req, res) => {
    try {
        const ourMissionData = await OurCompanyProfile.findAll(); // Fetch all entries

        if (ourMissionData.length === 0) {
            return res.status(404).json({ success: false, message: "No data found." });
        }

        res.status(200).json({ success: true, data: ourMissionData });
    } catch (error) {
        console.error("Error retrieving data:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
// start director profile
exports.createOurDirectorProfile = async (req, res) => {
    try {
        // Extract text fields from the request body
        const { text } = req.body;

        // Handle the uploaded file and get its filename
        const imageFilename = req.file.filename; // Using single file upload

        // Remove all existing entries
        await OurDirectorProfile.destroy({ where: {} });

        // Create a new OurMission entry
        const newOurMission = await OurDirectorProfile.create({
            image: imageFilename, // Store the image filename
            text,
           
        });

        // Respond with success and the newly created entry
        res.status(201).json({ success: true, data: newOurMission, message: "Data replaced successfully." });
    } catch (error) {
        console.error("Error processing data:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Controller for retrieving all OurMission entries
exports.getOurDirectorProfile = async (req, res) => {
    try {
        const ourMissionData = await OurDirectorProfile.findAll(); // Fetch all entries

        if (ourMissionData.length === 0) {
            return res.status(404).json({ success: false, message: "No data found." });
        }

        res.status(200).json({ success: true, data: ourMissionData });
    } catch (error) {
        console.error("Error retrieving data:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


// director managing words start section
exports.createDirectorManagingWords = async (req, res) => {
    try {
        const { text1, text2, text3 } = req.body;

        console.log('Received data:', { text1, text2, text3 });

        // Validate request data
        if (!text1 || !text2 || !text3) {
            return res.status(400).json({ success: false, message: "Missing required fields." });
        }

        // Remove all existing entries
        await OurDirectorManagingWords.destroy({ where: {} });

        // Create a new entry
        const newOurMission = await OurDirectorManagingWords.create({ text1, text2, text3 });

        res.status(201).json({ success: true, data: newOurMission, message: "Data replaced successfully." });
    } catch (error) {
        console.error("Error processing data:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Controller for retrieving all OurMission entries
exports.getDirectorManagingWords = async (req, res) => {
    try {
        const ourMissionData = await OurDirectorManagingWords.findAll(); // Fetch all entries

        if (ourMissionData.length === 0) {
            return res.status(404).json({ success: false, message: "No data found." });
        }

        // Log the data to check if it's complete
        console.log("Retrieved data:", ourMissionData);

        res.status(200).json({ success: true, data: ourMissionData });
    } catch (error) {
        console.error("Error retrieving data:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

//our team section start
// Controller for creating a new team member
exports.createTeamMember = async (req, res) => {
    try {
        const { name, position, description, fb_link, insta_link, whatsapp_link } = req.body;

        const newTeamMember = await OurTeam.create({
            name,
            position,
            description,
            fb_link,
            insta_link,
            whatsapp_link,
            image: req.file ? req.file.filename : null
        });

        res.status(201).json({ success: true, data: newTeamMember });
    } catch (error) {
        console.error('Error creating team member:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
// Controller for retrieving all team members
exports.getAllTeamMembers = async (req, res) => {
    try {
        const teamMembers = await OurTeam.findAll();
        res.status(200).json({ success: true, data: teamMembers });
    } catch (error) {
        console.error('Error retrieving team members:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// start Why syara Retails Section
exports.createWhySyaraRetails = async (req, res) => {
    try {
        const { text } = req.body;

        // Prepare image data
        const images = req.files ? req.files.map(file => ({
            filename: file.originalname,
            path: file.path
        })) : [];

        // Delete all existing entries
        await WhySyaraRetails.destroy({ where: {} });

        // Create new entry
        const newEntry = await WhySyaraRetails.create({ text, images });

        res.status(200).json({ message: 'Entry created successfully', data: newEntry });
    } catch (err) {
        res.status(500).json({ message: 'Error processing request', error: err });
    }
};

// Fetch all records of syara retails
exports.getWhySyaraRetils = async (req, res) => {
    try {
        const entries = await WhySyaraRetails.findAll();
        res.status(200).json({ data: entries });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching entries', error: err });
    }
};


// our blogs section start 
exports.createBlogs = async (req, res) => {
    try {
        const { text } = req.body;
        const image = req.file ? req.file.path : null; // Assuming you're using multer for file uploads

        const newEntry = await OurBlogs.create({ text, image });
        res.status(201).json({ message: 'Entry created successfully', data: newEntry });
    } catch (err) {
        res.status(500).json({ message: 'Error creating entry', error: err });
    }
};

exports.getAllBogs = async (req, res) => {
    try {
        const blogs = await OurBlogs.findAll(); // Ensure this returns data
        res.json({ data: blogs });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blogs', error });
    }
};
// Delete a blog entry by ID
exports.deleteBlog = async (req, res) => {
    const { id } = req.params; // Get the blog ID from the request parameters
    console.log("Deleting blog with ID:", id); // Log the ID being deleted

    try {
        const deletedBlog = await OurBlogs.destroy({
            where: { id } // Find the blog by ID
        });

        if (!deletedBlog) {
            return res.status(404).json({ success: false, message: "Blog not found." });
        }

        res.status(200).json({ success: true, message: "Blog deleted successfully." });
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
