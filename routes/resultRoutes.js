const express = require('express');
const router = express.Router();
const Score = require('../models/scores');
const {isLoggedIn, catchAsync} = require('../helpers');

router.get('/', isLoggedIn, catchAsync(async (req, res) => {
  const scores = await Score.find({user: req.user._id});
  res.render('trivia/results', {scores});
}));

module.exports = router;
