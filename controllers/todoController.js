(function (todoController) {
	'use strict';

	var todoService = require('../services/todoService');

	todoController.init = function (app) {

	    app.get('/api/todos', function(req, res) {

	    	function next (err, todos) {
	    		if (err) {
					res.status(500).send(err);
	    		}else{
	    			res.status(200).send(todos);
	    		}
	    	}

	    	var todos = todoService.getTodos(next);
	    });

	    app.post('/api/todos', function(req, res) {

	    	function next (err) {
	    		if (err) {
					res.status(500).send(err);
	    		}else{
	    			res.sendStatus(200);
	    		}
	    	}

			var body = "";
			
			req.on('data', function (chunk) {
				body += chunk;
			});
			
			req.on('end', function () {
		    	var todo = JSON.parse(body);
		    	var todos = todoService.addTodo(todo, next);
			})
	    });

	    // delete a todo
	    app.delete('/api/todos/:todo_id', function(req, res) {

	    	function next (err) {
	    		if (err) {
					res.status(500).send(err);
	    		}else{
	    			res.sendStatus(200);
	    		}
	    	}

	    	var todoId = req.params.todo_id;
	    	todoService.deleteTodo(todoId, next);
	    });
	};
}

)(module.exports);