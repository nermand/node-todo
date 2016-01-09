(function (todoController) {
	'use strict';

	var todoService = require('../services/todoService');

	todoController.init = function (app) {

	    app.get('/api/todos', function(req, res) {
			
			function onSuccess (todos) {
				res.status(200).json(todos);
			}

			function onError (todos) {
				res.status(500).json(err);
			}
	    	
	    	todoService.getTodos().then(onSuccess).catch(onError);
	    });

	    app.get('/api/todos/:todoId', function(req, res) {
			
			function onSuccess (todo) {
				res.status(200).json(todo);
			}

			function onError (err) {
				res.status(500).json(err);
			}

	    	var todoId = req.params.todoId;
	    	todoService.getTodo(todoId).then(onSuccess).catch(onError);
	    });

	    app.post('/api/todos', function(req, res) {

			var body = "";
			
			req.on('data', function (chunk) {
				body += chunk;
			});
			
			req.on('end', function () {

				if (body.length === 0) {
					res.status(400).json('Bad request');
					return;
				}
		    	var todo = JSON.parse(body);
		    	var todos = todoService.addTodo(todo).then(onSuccess).catch(onError);
			});

			req.on('error', function(e) {
			  	console.log('problem with request: ' + e.message);
				res.status(500).json(e.message);
			});

			function onSuccess (todos) {
				res.sendStatus(204);
			}

			function onError (err) {
				res.status(500).json(err);
			}
	    });

	    app.delete('/api/todos/:todoId', function(req, res) {

			function onSuccess (todo) {
				if (todo) {
					res.sendStatus(200);
				}else{
					res.sendStatus(404);
				}
			}

			function onError (err) {
				res.status(500).json(err);
			}

	    	var todoId = req.params.todoId;

	    	todoService.deleteTodo(todoId).then(onSuccess).catch(onError);
	    });
	};
}

)(module.exports);