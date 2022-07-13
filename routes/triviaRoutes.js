const express = require('express');
const router = express.Router();
const Trivia = require('../models/trivia');
const Question = require('../models/questions');
const Score = require('../models/scores');
const {isLoggedIn, isOwner, catchAsync} = require('../helpers');

// import from controller 
const trivia = require('../controllers/trivias');

// get index
router.get('/', catchAsync(trivia.getIndex));

// new form
router.get('/new', isLoggedIn, catchAsync(trivia.getNewTrivia));

// post form
router.post('/new', isLoggedIn, catchAsync(trivia.postNewTrivia));

// edit form
router.get('/:id/edit', isLoggedIn, isOwner, catchAsync(trivia.getEditTrivia));

router.put('/:id', isLoggedIn, isOwner, catchAsync(trivia.putEditTrivia));

// show
router.get('/:id', catchAsync(trivia.showTrivia));

// play
router.get('/:id/play', catchAsync(trivia.playTrivia));

// submit quiz
router.post('/:id/play', catchAsync(trivia.submitTrivia));

// delete quiz
router.delete('/:id', isLoggedIn, isOwner, catchAsync(trivia.deleteTrivia));


module.exports = router;
