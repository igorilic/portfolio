var winston = require('winston');

function getLogger(module) {
	// using filename in log statements
	var path = module.filename.split('/').slice(-2).join('/');
	
	return new winston.Logger({
		transports: [
			new winston.transports.Console({
				colorize: true,
				level: 'debug',
				label: path
			})
		]
	});
}

module.exports = getLogger;