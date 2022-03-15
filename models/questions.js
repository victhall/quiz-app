const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  question: {
    type: String,
    required: true  
  },
  options: {
    type: Array,
    required: true
  },
  correctOption: {
    type: Array,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('Question', QuestionSchema)