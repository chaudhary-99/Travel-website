const express = require('express');
const getfixedpackages = require('../controllers/packages');

const router = express.Router();

// Package Routes
router.get('/', getfixedpackages); // Get fixed packages   

module.exports = router;
