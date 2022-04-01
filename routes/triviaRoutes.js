const express = require('express');
const router = express.Router();
const Trivia = require('../models/trivia')
const Question = require('../models/questions')
const Score = require('../models/scores')
const mongoose = require('mongoose');
const { isLoggedIn, isOwner, catchAsync } = require('../helpers')

//index
router.get('/', catchAsync(async (req, res) => {
  const trivias = await Trivia.find({ is_public: true });
  res.render('trivia/index', { trivias })
}));

//new form
router.get('/new', isLoggedIn, catchAsync(async (req, res) => {
  res.render('trivia/new')
}));

//post form
router.post('/new', isLoggedIn, catchAsync(async (req, res) => {
  const trivia = new Trivia({
    title: req.body.title,
    description: req.body.description,
    is_public: req.body.is_public,
    owner: req.user._id,
    image: req.body.image,
  })
  console.log('req,body', req.body)
  Question.insertMany([
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
  req.flash('success', 'YOU\'VE SUCCESSFULLY CREATED A NEW QUIZ!');
  res.redirect(`/trivia/${trivia._id}`);
}))

//edit form
router.get('/:id/edit', isLoggedIn, isOwner, catchAsync(async (req, res) => {
  const { id } = req.params;
  const trivia = await Trivia.findById(id);
  const questions = await Question.find({ triviaId: id });
  if (!trivia) {
    req.flash('error', 'Cannot find that trivia.')
  }
  res.render('trivia/edit', { trivia, questions })
}));

router.put('/:id', isLoggedIn, isOwner, catchAsync(async (req, res) => {
  const { id } = req.params;
  const trivia = await Trivia.findByIdAndUpdate(id, { ...req.body });
  const questions = await Question.find({ triviaId: id });
  const example = questions[0]._id
  const example2 = questions[1]._id
  const example3 = questions[2]._id
  const example4 = questions[3]._id
  const example5 = questions[4]._id
  const example6 = questions[5]._id
  const example7 = questions[6]._id
  const example8 = questions[7]._id

  Question.findByIdAndUpdate(example, { $set: { question: req.body.question, options: req.body.options, correct: req.body.correct_options } }).exec();
  Question.findByIdAndUpdate(example2, { $set: { question: req.body.question2, options: req.body.options2, correct: req.body.correct_option2 } }).exec();
  Question.findByIdAndUpdate(example3, { $set: { question: req.body.question3, options: req.body.options3, correct: req.body.correct_options3 } }).exec();
  Question.findByIdAndUpdate(example4, { $set: { question: req.body.question4, options: req.body.options4, correct: req.body.correct_options4 } }).exec();
  Question.findByIdAndUpdate(example5, { $set: { question: req.body.question5, options: req.body.options5, correct: req.body.correct_options5 } }).exec();
  Question.findByIdAndUpdate(example6, { $set: { question: req.body.question6, options: req.body.options6, correct: req.body.correct_options6 } }).exec();
  Question.findByIdAndUpdate(example7, { $set: { question: req.body.question7, options: req.body.options7, correct: req.body.correct_options7 } }).exec();
  Question.findByIdAndUpdate(example8, { $set: { question: req.body.question8, options: req.body.options8, correct: req.body.correct_options8 } }).exec();

  await trivia.save();
  req.flash('success', 'SUCCESSFULLY UPDATED QUIZ!');
  res.redirect(`/trivia/${trivia._id}`);
}));

//show
router.get('/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  const trivia = await Trivia.findById(id)

  res.render('trivia/show', { trivia })
}));

//play
router.get('/:id/play', catchAsync(async (req, res) => {
  const { id } = req.params;
  const trivia = await Trivia.findById(id);
  const questions = await Question.find({ triviaId: id })
  // console.log('questions', questions)
  res.render('trivia/play', { questions, trivia })
}));

//submit play
router.post('/:id/play', catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const trivia = await Trivia.findById(id);
  const questions = await Question.find({ triviaId: id })
  const answer = Object.values(req.body);
  const correctAnswers = [];
  for (let question of questions) {
    correctAnswers.push(question.correct_option.toLowerCase())
  }
  let result = answer.map((item, i) => {
    const answerLowerCase = item.toLowerCase();
    return answerLowerCase === correctAnswers[i];
  });
  console.log(correctAnswers)
  const count = result.filter(Boolean).length;

  if (!req.isAuthenticated()){
    res.render('trivia/score', { trivia, count, correctAnswers })
  } else {
  const scores = await Score.create({
    achievements: count,
    triviaId: id,
    user: req.user._id,
    triviaTitle: trivia.title,
    date: new Date
  })
  res.render('trivia/score', { trivia, count, correctAnswers, scores })
}

}));

router.delete('/:id', isLoggedIn, isOwner, catchAsync(async (req, res) => {
  const { id } = req.params;
  await Question.deleteMany({ triviaId: id });
  await Trivia.findByIdAndDelete(id);
  req.flash('success', 'SUCCESSFULLY DELETED QUIZ')
  res.redirect('/trivia');
}));


module.exports = router;
