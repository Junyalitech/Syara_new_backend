const express = require('express');
const { verifyToken } = require('../middleware/authmiddleware'); // Adjust path if necessary

const router = express.Router();

router.get('/protected-route', verifyToken, (req, res) => {
  res.send('This is a protected route');
});

module.exports = router;
