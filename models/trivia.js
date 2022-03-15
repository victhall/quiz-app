const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TriviaSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  is_public: {
    type: Boolean,
    default: true,
    required: true
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Question'
    }
  ]
});


module.exports = mongoose.model('Trivia', TriviaSchema);