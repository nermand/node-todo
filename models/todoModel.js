var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

module.exports = mongoose.model('Todo', {
	id : { type: String },
	title : {type : String, default: ''}
});