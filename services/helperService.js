(function (helperService) {
	'use strict';

	var Promise = require('bluebird');

	helperService.parseRequestBody = function (req) {

		return new Promise(function(resolve, reject) {
			var body = '';

			req.on('data', function (chunk) {
				body += chunk;
			});

			req.on('end', function () {

				if (body.length === 0) {
					return reject({
						emptyBody: true,
						message: 'Bad request'
					});
				}

		    	var jsonBody = JSON.parse(body);
		    	return resolve(jsonBody);
			});

			req.on('error', function(e) {
			  	console.log(
			  		{
						message: 'Problem with parsing POST request: ' + e.message
					});
				return reject(e.message);
			});
		});
	};


}

)(module.exports);
