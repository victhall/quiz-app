const express = require('express');
const router = express.Router();
const {isLoggedIn, catchAsync} = require('../helpers');
const results = require('../controllers/results')

router.get('/', isLoggedIn, catchAsync(results.getScores));

module.exports = router;
