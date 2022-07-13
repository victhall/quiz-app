const User = require('../models/users');
const Trivia = require('../models/trivia');

//get register page
const getRegister = async (req, res) => {
  res.render('users/register');
}

//post register form data to db
const postRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err)
        return next(err);
      res.redirect('/trivia');
    });
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('/users/register');
  }
}

//get login page
const getLogin = async (req, res) => {
  res.render('users/login');
}

//post login form
const postLogin = (req, res) => {
  const redirectUrl = req.session.returnTo || '/trivia';
  delete req.session.returnTo;
  res.redirect(redirectUrl);
}

//logout user
const logout = async (req, res) => {
  req.logout();
  res.redirect('/trivia');
}

//get all trivias by a user
const getAllTrivias = async (req, res) => {
  const publicTrivias = await Trivia.find({
    owner: req.user._id,
    is_public: true
  });
  console.log(publicTrivias)
  const privateTrivias = await Trivia.find({
    owner: req.user._id,
    is_public: false
  });
  console.log(privateTrivias)
  if (publicTrivias || privateTrivias) {
    res.render('users/trivias', { publicTrivias, privateTrivias });
  } else {
    res.send('no quizzes found');
  }
}

//export to router
module.exports = {
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  logout,
  getAllTrivias
}