const express = require('express');
const router = express.Router();
const Trivia = require('../models/trivia')
const Question = require('../models/questions')
const ObjectId = require('mongodb').ObjectID;

// const Score = require('../models/scores')

//index
router.get('/', async(req, res)=>{
  const trivias = await Trivia.find({})
  res.render('trivia/index', { trivias })
})

//show
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const trivia = await Trivia.findById(id)
  console.log(trivia)
  res.render('trivia/show', { trivia })
});

//
router.get('/:id/play', async (req, res) => {
  const { id } = req.params;
  const trivia = await Trivia.findById(id);
  const questions = await Question.find({triviaId: id})
  // console.log('TRIVIA', trivia);
  // console.log('TRIVIA TITLE', trivia[0].title);
  console.log('QUESTIONS', questions)
  // console.log('CORRECT ANSWER', correctAnswer);
  res.render('trivia/play', { questions, trivia })
});

router.post('/:id/play', async (req, res, next) => {
  const { id } = req.params;
  const trivia = await Trivia.findById(id);
  const questions = await Question.find({triviaId: id})
  const answer = Object.values(req.body);
  console.log('SELECTED ANSWER', answer);
  // const correctAnswer = questions.map(question => question.correct_option);
  // console.log('COORECT',correctAnswer)
  const correctAnswers = [];
  const score = 0;
  for (let question of questions) {
    correctAnswers.push(question.correct_option)
  }
  let result = answer.map((item, i) => {
    return item === correctAnswers[i];
  });
  console.log(result);
  const count = result.filter(Boolean).length;

  console.log('correct asnwers', correctAnswers)
  res.render('trivia/score', {trivia, count, correctAnswers})
});

module.exports = router;

// Newcontract.findOne({
//   "contractInfo.userid": req.body.id
// })

array1 = [22, 13, 14, 15, 16]
array2 = [22, 13, 45, 11, 7]

// const arr = [true, false, true, false, true];
// const count = arr.filter(Boolean).length;

// console.log(count);

