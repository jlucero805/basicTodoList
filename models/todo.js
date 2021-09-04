const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
	body: String
});

const Todo = mongoose.model('todo', todoSchema);

module.exports = Todo;