(function (todoService) {
	'use strict';

	var Todo = require('../models/todoModel');
	var uuid = require('node-uuid');
	var Promise = require('bluebird');

	function getAllTodos() {
		return Todo.find();
	}

	todoService.getTodos = function () {
		return getAllTodos();
	};

	todoService.getTodo = function (todoId) {
		// return Todo.findOne({id : todoId});
		return new Promise(function(resolve, reject) {
			Todo.findOne({id : todoId}, function (err, todo) {
				if (err) {
					return reject(err);
				}

				if (todo) {
					return resolve(todo);
				}else {
					return reject('Could not find todo with id: ' + todoId);
				}
			});
		});
	};

	todoService.addTodo = function (todo) {

		if (!todo || !todo.title) {
			return Promise.reject('Empty todo item');
		}

		return Todo.create({
			id: uuid.v1(),
			title : todo.title,
			dueDate : todo.dueDate,
			priority : todo.priority,
			completed : todo.completed
		});
	};

	todoService.deleteTodo = function (todoId) {

		if (!todoId) {
			return Promise.reject('Cannot remove todo without an ID');
		}

		return Todo.findOneAndRemove({id : todoId});
	};

	todoService.updateTodo = function (todo) {

		if (!todo || !todo.id) {
			return Promise.reject('Cannot update todo without an ID');
		}

		return Todo.findOneAndUpdate({id : todo.id}, todo);
	};
}

)(module.exports);
