const Score = require('../models/scores');

const getScores = async (req, res) => {
  const scores = await Score.find({user: req.user._id});
  res.render('trivia/results', {scores});
}

module.exports = {getScores}