(function () {
    'use strict';

    angular
    	.module('nodeTodo')
    	.filter('priority', priority);

    priority.$inject = ['constants'];

    function priority(constants) {

        return function (priorityNumber) {
            switch (priorityNumber) {
                case 0:
                    return constants.priority.low;
                case 1:
                    return constants.priority.medium;
                case 2:
                    return constants.priority.high;
                default:
                    return '--';
            }
        };
    }
})();
