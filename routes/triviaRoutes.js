const express = require('express');
const router = express.Router();
const Trivia = require('../models/trivia')

router.get('/')

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const trivias = await Trivia.find({})
  console.log(trivias)
  res.render('trivia/show', {trivias})
});

router.get('/:id/play', async (req, res) => {
  const { id } = req.params;
  const trivias = await Trivia.findById(id)
  res.render('trivia/play', {trivias})
})

module.exports = router;