(function (todoController) {
	'use strict';

	var todoService = require('../services/todoService');
	//var helperService = require('../services/helperService');

	todoController.init = function (app) {

	    app.get('/api/todos', function(req, res) {

			function onSuccess (todos) {
				res.status(200).json(todos);
			}

			function onError (err) {
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

			todoService.addTodo(req.body).then(onSuccess).catch(onError);

			function onSuccess (todo) {
				res.status(200).json(todo.id);
			}

			function onError (err) {
				res.status(500).json(err);
			}
	    });

	    app.delete('/api/todos/:todoId', function(req, res) {

			function onSuccess (todo) {
				if (todo) {
					res.sendStatus(200);
				}else {
					res.sendStatus(404);
				}
			}

			function onError (err) {
				res.status(500).json(err);
			}

	    	var todoId = req.params.todoId;

	    	todoService.deleteTodo(todoId).then(onSuccess).catch(onError);
	    });

	    app.put('/api/todos', function(req, res) {

			function onUpdateSuccess (todo) {
				if (todo) {
					res.sendStatus(200);
				}else {
					res.sendStatus(404);
				}
			}

  			function onUpdateError (err) {
    			res.status(500).json(err);
  			}

  			todoService.updateTodo(req.body)
  				.then(onUpdateSuccess)
  				.catch(onUpdateError);
	    });
	};
}

)(module.exports);
