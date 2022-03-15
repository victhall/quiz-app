const express = require('express');
const router = express.Router();
const Trivia = require('../models/trivia')
const Question = require('../models/questions')

router.get('/')

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const trivias = await Trivia.find({})
  console.log(trivias)
  res.render('trivia/show', {trivias})
});

router.get('/:id/play', async (req, res) => {
  const { id } = req.params;
  const questions = await Question.find({id})
  res.render('trivia/play', {questions})
})

module.exports = router;