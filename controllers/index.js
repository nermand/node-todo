(function(controllers) {
	'use strict';

    var testController = require("./testController");
    var todoController = require("./todoController");
    var homeController = require("./homeController");
	
	controllers.init = function (app) {
	    testController.init(app);
	    todoController.init(app);

	    //Keep this at the bottom
	    homeController.init(app);
	};
})(module.exports);