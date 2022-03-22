const Trivia = require('./models/trivia');

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    return res.redirect('/users/login')
  }
  next();
}

const isOwner = async (req, res, next) => {
  const { id } = req.params;
  const trivia = await Trivia.findById(id);
  if (!trivia.owner.equals(req.user._id)) {
    return res.redirect(`/trivia/${id}`)
  }
  next();
}

const catchAsync = func => {
  return (req, res, next) => {
    func(req, res, next)
      .catch(next);
  }
}

module.exports = { isLoggedIn, isOwner, catchAsync }