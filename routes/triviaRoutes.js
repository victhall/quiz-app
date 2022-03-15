const express = require('express');
const router = express.Router();
const Trivia = require('../models/trivia')
const Question = require('../models/questions')

router.get('/')

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const trivias = await Trivia.find({})
  console.log(trivias)
  res.render('trivia/show', { trivias })
});

router.get('/:id/play', async (req, res) => {
  const { id } = req.params;
  const questions = await Question.find({ id });
  const trivia = await Trivia.find({id});
  console.log('TRIVIA', trivia);
  console.log('TRIVIA TITLE', trivia[0].title);

  // console.log('CORRECT ANSWER', correctAnswer);
  res.render('trivia/play', { questions, trivia })
});

router.post('/:id/play', async (req, res) => {
  const { id } = req.params;
  const trivia = await Trivia.find({id});
  const questions = await Question.find({ id });
  const answer = Object.values(req.body);
  console.log('SELECTED ANSWER',answer);
  // const correctAnswer = questions.map(question => question.correct_option);
  // console.log('COORECT',correctAnswer)

  for (let question of questions){
    if (question.correct_option == answer){
      console.log('TRUE')
    } else {
      console.log('FALSE')
    }
  }
  // res.redirect('/')


});

module.exports = router;

// Newcontract.findOne({
//   "contractInfo.userid": req.body.id
// })