const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
  achievements: {
    type: Number,
    required: true
  },
  player: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});


module.exports = mongoose.model('Score', ScoreSchema);