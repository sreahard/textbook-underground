
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
	//required:
	title: {type: String, required: true},
	author: {type: String, required: true},
	ISBN: {type: String, required: true},
	price: {type: String, required: true},
	condition: {type: String, required: true},
	date: { type: Date, default: Date.now },
	createdBy: {type: String, required: true},
	//optional:
	description: String,
	photo: String, //URL
	courseID: String,
	subject: String,
	
});

var Book = mongoose.model('book', bookSchema)

module.exports = Book