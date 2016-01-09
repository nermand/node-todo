(function (todoService) {
	'use strict';

	var Todo = require('../models/todoModel');
	var uuid = require('node-uuid');
	var Promise = require("bluebird");

	// function getTodosOld(next){
	// 	Todo.find(function(err, todos) {

	// 		// if there is an error retrieving, send the error.
	// 		if (err){
	// 			next(null);
	// 		}else{
	// 			next(null, todos);
	// 		}
	// 	});
	// }

	function getAllTodos(){
		return Todo.find();
	}

	todoService.getTodos = function () {
		return getAllTodos();
	};

	todoService.getTodo = function (todoId) {
// return Todo.findOne({id : todoId});
		return new Promise(function(resolve, reject){
			Todo.findOne({id : todoId}, function (err, todo) {
				if (err) {
					return reject(err);
				}

				if (todo) {
					return resolve(todo);
				}else{
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
			title : todo.title
		});
	};

	todoService.deleteTodo = function (todoId) {

		if (!todoId) {
			return Promise.reject('Cannot remove todo without an ID');
		}

		return Todo.findOneAndRemove({id : todoId});
	};
}

)(module.exports);