(function() {
  'use strict';

  var constants = {
    restApi: 'http://localhost:3000/api',

    priority: {
    	low: 'Low',
    	medium: 'Medium',
    	high: 'High'
    }
  };

  angular
    .module('nodeTodo')
    .constant('constants', constants);

})();
