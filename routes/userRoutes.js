const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/users');
const Trivia = require('../models/trivia')
const Question = require('../models/questions')
const { catchAsync, isLoggedIn } = require('../helpers')

router.get('/register', catchAsync(async (req, res) => {
  res.render('users/register')
}));

router.post('/register', catchAsync(async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ email, username })
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
      if (err)
        return next(err);
      res.redirect('/trivia')
    })
  } catch (e) {
    req.flash('error', e.message)
    res.redirect('/users/register')
  }
}));

router.get('/login', catchAsync(async (req, res) => {
  res.render('users/login')
}));

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/users/login' }), (req, res) => {
  const redirectUrl = req.session.returnTo || '/trivia';
  delete req.session.returnTo;
  res.redirect(redirectUrl);
});

router.get('/logout', catchAsync(async (req, res) => {
  req.logout();
  res.redirect('/trivia');
}));

router.get('/trivias', isLoggedIn, catchAsync(async (req, res) => {
  const publicTrivias = await Trivia.find({ owner: req.user._id, is_public: true })
  const privateTrivias = await Trivia.find({ owner: req.user._id, is_public: false })

console.log('public', publicTrivias.length)
console.log('private', privateTrivias.length)

  if (publicTrivias || privateTrivias) {
    res.render('users/trivias', { publicTrivias, privateTrivias});
  } else {
    res.send('no quizzes found')
  }

}));

module.exports = router;
