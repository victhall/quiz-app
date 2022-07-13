const Trivia = require('./models/trivia');

//checks if a user is logged in 
//otherwise redirects you to previous page
const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash('error', 'You must be logged in.');
    return res.redirect('/users/login');
  }
  next();
};

//checks if logged in user is owner of a quiz
//if not flashes error msg
const isOwner = async (req, res, next) => {
  const {id} = req.params;
  const trivia = await Trivia.findById(id);
  if (!trivia.owner.equals(req.user._id)) {
    req.flash('error', 'You do not have permission to perform that action.');
    return res.redirect(`/trivia/${id}`);
  }
  next();
};

//async await error handling
const catchAsync = (func) => {
  return (req, res, next) => {
    func(req, res, next)
        .catch(next);
  };
};


module.exports = {isLoggedIn, isOwner, catchAsync};
