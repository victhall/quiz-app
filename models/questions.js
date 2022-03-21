const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Trivia = require('./trivia');

const QuestionSchema = new Schema({
  question: {
    type: String,
    required: true  
  },
  options: {
    type: Array,
    required: true
  },
  correct_option: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  triviaId: {
    type: Schema.Types.ObjectId,
    ref: 'Trivia'
  }
});


module.exports = mongoose.model('Question', QuestionSchema);