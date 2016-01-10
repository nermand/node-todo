(function(homeController) {
	'use strict';

	homeController.init = function(app) {

		app.get('/', function (req, res) {
			res.status(200).send('It works!');
		});

		// application -------------------------------------------------------------
		// load the single view file
		// (angular will handle the page changes on the front-end)
	    app.get('*', function(req, res) {
	        res.sendfile('./public/index.html');
	    });

	    app.use(function(req, res) {
		    res.status(302).redirect('/');
		});
	};

})(module.exports);
