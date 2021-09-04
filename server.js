const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// require('dotenv').config();

// models
const Todo = require('./models/todo');

mongoose.connect(`mongodb+srv://jlucero:Jbl93422@cluster0.v3aqi.mongodb.net/basicTodoList?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
	.then(() => {console.log('connected to mongo!')})
	.catch((err) => {console.log('mongo connection failed!')});

app.use(cors());
app.use(express.json());

app.get('/basicTodoList', async (req, res) => {
	const allTodos = await Todo.find({});
	res.json({todos: allTodos}).status(200);
});

app.get('/basicTodoList/:id', async (req, res) => {
	const id = req.params.id;
	const todo = await Todo.find({ _id: id });
	res.json({ todo: todo[0] }).status(200);
});

app.post('/basicTodoList', async (req, res) => {
	const newTodo = new Todo({
		body: req.body.body
	});
	await newTodo.save();
	res.sendStatus(201);
});

app.delete('/basicTodoList/:id', async (req, res) => {
	const id = req.params.id;
	const todo = await Todo.findOneAndDelete({ _id: id });
	res.sendStatus(202);
})

app.get('/basicTodoList/test/test', async (req, res) => {
	res.sendStatus(200);
});

app.listen(8081, () => {
	console.log('listening...');
});