(function(homeController) {
	"use strict";

	homeController.init = function(app) {
		
		app.get("/", function (req, res) {
			res.status(200).send('It works!');
		});

	    app.use(function(req, res){
		    res.status(302).redirect('/');
		});
	};

})(module.exports);