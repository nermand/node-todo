(function () {
    'use strict';

    angular
      .module('nodeTodo')
      .config(routerConfig);

    routerConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('/', {
                url: '/',
                templateUrl: 'app/todo/todo.html',
                controller: 'TodoController',
                controllerAs: 'todo'
            });

        $urlRouterProvider.otherwise('/');
    }

})();
