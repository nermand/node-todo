(function () {
    'use strict';

    angular
    	.module('nodeTodo')
    	.factory('todoService', todoService);

    todoService.$inject = ['$log', '$http', 'constants'];

    function todoService($log, $http, constants) {

        function getAllTodos () {
            var uri = constants.restApi + '/todos';
            return $http.get(uri);
        }

        function createTodo (todo) {
            var uri = constants.restApi + '/todos';
            return $http.post(uri, todo);
        }

        function deleteTodo (todoId) {
            var uri = constants.restApi + '/todos/' + todoId;
            return $http.delete(uri);
        }

        function updateTodo (todo) {
            var uri = constants.restApi + '/todos';
            return $http.put(uri, todo);
        }

        return {
            getAllTodos: getAllTodos,
            createTodo: createTodo,
            deleteTodo: deleteTodo,
            updateTodo: updateTodo
        };
    }
})();
