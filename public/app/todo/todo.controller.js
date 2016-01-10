(function () {
    'use strict';

    angular
    	.module('nodeTodo')
    	.controller('TodoController', TodoController);

    TodoController.$inject = ['$log', 'todoService', 'toastr'];

    function TodoController($log, todoService, toastr) {
        var vm = this;

        vm.formData = {};

        vm.cal = {
            options : {
                formatYear: 'yy',
                startingDay: 1
            },
            format: 'yyyy/MM/dd',
            opened: false
        };

        vm.openCal = function () {
            vm.cal.opened = true;
        };

        vm.isFormDataValid = function () {
            return vm.formData &&
                   vm.formData.title &&
                   vm.formData.dueDate &&
                   vm.formData.priority;
        };

        vm.create = function() {
            todoService.createTodo(vm.formData)
                .then((res) => {

                    var todo = {
                        id: res.data,
                        title: vm.formData.title,
                        priority: +vm.formData.priority,
                        dueDate: vm.formData.dueDate,
                        completed: vm.formData.completed
                    };
                    vm.todos.push(todo);

                    vm.formData = {};
                    $log.info('Todo created successfully');
                    toastr.success('Todo created successfully');
                })
                .catch((err) => {
                    $log.error('Could not create todo', err);
                    toastr.error('Could not create todo' + err, 'Error');
                });
        };

        vm.deleteTodo = function(todoId) {
            todoService.deleteTodo(todoId)
                .then(() => {
                    $log.info('Todo deleted successfully');
                    toastr.success('Todo deleted successfully');

                    var index = vm.todos.findIndex((t) => {
                        return t.id === todoId;
                    });

                    if (index !== -1) {
                        vm.todos.splice(index, 1);
                    }
                })
                .catch((err) => {
                    $log.error('Could not delete todo', err);
                    toastr.error('Could not delete todo' + err, 'Error');
                });
        };

        vm.markAsComplete = function(todo) {
            todo.completed = !todo.completed;

            todoService.updateTodo(todo)
                .then(() => {
                    $log.info('Todo complete toggled successfully');
                    toastr.success('Todo complete toggled successfully');
                })
                .catch((err) => {
                    todo.completed = !todo.completed;
                    $log.error('Could not toggle complete flag', err);
                    toastr.error('Could not toggle complete flag' + err,
                        'Error');
                });
        };

        activate();

        function activate () {

            todoService.getAllTodos()
                .then((todos) => {
                    $log.info('todos', todos);
                    vm.todos = todos.data;
                })
                .catch((err) => {
                    $log.error('Could not retrieve list of todos', err);
                });
        }
    }

})();
