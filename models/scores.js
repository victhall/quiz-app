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























  
  // player: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User'
  // }
});


module.exports = mongoose.model('Score', ScoreSchema);