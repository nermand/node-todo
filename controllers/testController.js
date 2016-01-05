(function (testController) {
	'use strict';

	testController.init = function (app) {
		app.get('/api/ping', function(req, res){
			res.send('Echo reply');
		});
	};
}

)(module.exports);