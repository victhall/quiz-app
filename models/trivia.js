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
	image: {
		type: String,
		require: true
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});


module.exports = mongoose.model('Trivia', TriviaSchema);
