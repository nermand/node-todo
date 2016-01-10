var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

module.exports = mongoose.model('Todo', {
	id : { type: String },
	title : {type : String, default: ''},
	dueDate: {
		type: Date,
		//default 7 days from now
		default: new Date(+new Date() + 7 * 24 * 60 * 60 * 1000)
	},
	priority: { type: Number, default: 0 },
	completed: { type: Boolean, default: false }
});
