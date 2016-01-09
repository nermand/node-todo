(function (todoService) {
	'use strict';

	var todos = [
		{id: 1, title: 'Do the laundry'},
		{id: 2, title: 'Wash the dishes'}
	];

	todoService.getTodos = function (next) {
		next(null, todos);
	};

	todoService.addTodo = function (todo, next) {

		if (!todo) {
			next('Empty todo item');
			return;
		}

		todos.push(
			{ 
				id: todos.length + 1,
				title: todo.title
			}
		);
		next(null);
	};

	todoService.deleteTodo = function (todoId, next) {

		var todoIndex = todos.findIndex(function(t){
			return t.id === +todoId;
		});

		if (!todoId || todoIndex === -1) {
			next('Could not find todo with Id ' + todoId);
			return;
		}

		todos.splice(todoIndex, 1);
		next(null);
	};
}

)(module.exports);