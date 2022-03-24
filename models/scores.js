const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
  achievements: {
    type: Number,
    required: true
  },
  triviaId: {
    type: Schema.Types.ObjectId,
    ref: 'Trivia'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: '12345'
  },
  triviaTitle: {
    type: String
  },
  date: {
    type: Date,
    default: Date
  }
});

module.exports = mongoose.model('Score', ScoreSchema);