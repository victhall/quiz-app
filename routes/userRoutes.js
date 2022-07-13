const express = require('express');
const router = express.Router();
const passport = require('passport');
const { catchAsync, isLoggedIn } = require('../helpers');
//import from controller
const user = require('../controllers/user');

//get register page
router.get('/register', catchAsync(user.getRegister));

//post register form data to db
router.post('/register', catchAsync(user.postRegister));

//get login page
router.get('/login', catchAsync(user.getLogin));

//post login form
router.post('/login', passport.authenticate('local',
  { failureFlash: true, failureRedirect: '/users/login' }), user.postLogin);

//logout user
router.get('/logout', catchAsync(user.logout));

//get all trivias by a user
router.get('/trivias', isLoggedIn, catchAsync(user.getAllTrivias));

module.exports = router;

