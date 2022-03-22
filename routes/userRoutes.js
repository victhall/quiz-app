const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/users');
const { catchAsync } = require('../helpers')

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
    res.redirect('/register')
  }
}));

router.get('/login', catchAsync(async (req, res) => {
  res.render('users/login')
}));

router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
  const redirectUrl = req.session.returnTo || '/trivia';
  delete req.session.returnTo;
  res.redirect(redirectUrl);
});

router.get('/logout', catchAsync(async (req, res) => {
  req.logout();
  res.redirect('/trivia');
}));

module.exports = router;
