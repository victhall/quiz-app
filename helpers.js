const Trivia = require('./models/trivia');

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash('error', 'You must be logged in.');
    return res.redirect('/users/login');
  }
  next();
};

const isOwner = async (req, res, next) => {
  const {id} = req.params;
  const trivia = await Trivia.findById(id);
  if (!trivia.owner.equals(req.user._id)) {
    req.flash('error', 'You do not have permission to perform that action.');
    return res.redirect(`/trivia/${id}`);
  }
  next();
};

const catchAsync = (func) => {
  return (req, res, next) => {
    func(req, res, next)
        .catch(next);
  };
};


module.exports = {isLoggedIn, isOwner, catchAsync};
