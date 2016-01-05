
/**
* Load config properties from ./env/{environment name}
*
* ####Example:
* SET NODE_ENV=development
*
* @param {String} Define environment name through process.env.NODE_ENV. Default value is 'development'.
* @return {Config}
*/

module.exports = (function (env) {
  var config = {};

  switch (env) {
	case 'production':
	  config = require('../env/production');
	  break;
	case 'development':
	  config = require('../env/development');
	  break;
	case 'testing':
	  config = require('../env/testing');
	  break;
	case 'staging':
	  config = require('../env/staging');
	  break;
	default:
	  console.error('Error loading config.');
	  process.exit(1);
  }
  
  return config;
})(process.env.NODE_ENV || 'development');