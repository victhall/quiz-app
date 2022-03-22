const express = require('express');
const router = express.Router();
const Trivia = require('../models/trivia')
const Score = require('../models/scores')
const mongoose = require('mongoose');
const { isLoggedIn, isOwner, catchAsync } = require('../helpers')

router.get('/', isLoggedIn, catchAsync(async (req, res) => {
  
  const scores = await Score.find({user: req.user._id})
  console.log('score!', scores);

    res.render('trivia/results', { scores })

}));

module.exports = router;