const express = require('express');
const populardestinations = require('../controllers/populardestinations');

const router = express.Router();

// Popular Destinations Routes
router.get('/', populardestinations); // Get popular destinations

module.exports = router;
