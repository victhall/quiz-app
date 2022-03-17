const express = require('express');
const router = express.Router();
const Trivia = require('../models/trivia')
const Question = require('../models/questions')

// const Score = require('../models/scores')

//index
router.get('/', async (req, res) => {
  const trivias = await Trivia.find({})
  res.render('trivia/index', { trivias })
})

//new form
router.get('/new', async (req, res) => {
  res.render('trivia/new')
})

router.post('/new', async (req, res) => {
  Trivia.init();

  const trivia = new Trivia({
    title: req.body.title,
    description: req.body.description,
    is_public: req.body.is_public
  })
  const questions = Question.insertMany([
    { question: req.body.question, options: req.body.options, correct_option: req.body.correct_option, triviaId: trivia._id },
    { question: req.body.question2, options: req.body.options2, correct_option: req.body.correct_option2, triviaId: trivia._id },
    { question: req.body.question3, options: req.body.options3, correct_option: req.body.correct_option3, triviaId: trivia._id },
    { question: req.body.question4, options: req.body.options4, correct_option: req.body.correct_option4, triviaId: trivia._id },
    { question: req.body.question5, options: req.body.options5, correct_option: req.body.correct_option5, triviaId: trivia._id },
    { question: req.body.question6, options: req.body.options6, correct_option: req.body.correct_option6, triviaId: trivia._id },
    { question: req.body.question7, options: req.body.options7, correct_option: req.body.correct_option7, triviaId: trivia._id },
    { question: req.body.question8, options: req.body.options8, correct_option: req.body.correct_option8, triviaId: trivia._id },
  ])

  await trivia.save();
  console.log('NEWLY CREATED TRIVIA', trivia);
  console.log('NEWLY CREATED QUESTION', questions);
  res.redirect(`/trivia/${trivia._id}`);
  // res.send('FORM SENT')
})

//edit form
router.get('/edit', async (req, res) => {
  res.render('trivia/edit')
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
  const questions = await Question.find({ triviaId: id })
  // console.log('TRIVIA', trivia);
  // console.log('TRIVIA TITLE', trivia[0].title);
  console.log('QUESTIONS', questions)
  // console.log('CORRECT ANSWER', correctAnswer);
  res.render('trivia/play', { questions, trivia })
});

router.post('/:id/play', async (req, res, next) => {
  const { id } = req.params;
  const trivia = await Trivia.findById(id);
  const questions = await Question.find({ triviaId: id })
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
  res.render('trivia/score', { trivia, count, correctAnswers })
});



module.exports = router;


