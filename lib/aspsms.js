var request = require('request');

var _defaultOptions = {
	'userkey' : null, 
	'password' : null, 
	'originator' : null, 
	'recipient' : null
};

var setDefaultOptions = function (options) {
	_defaultOptions = options;
};

var send = function (options, callback, message) {
	for (var key in _defaultOptions) {
		options[key] = options[key] || _defaultOptions[key];

		options[key] = options[key].replace(/&/g, '&#38;');
		options[key] = options[key].replace(/</g, '&#60;');
		options[key] = options[key].replace(/>/g, '&#62;');
	}

	var xml = '<?xml version="1.0" encoding="ISO-8859-1"?>\r\n'
		+ '<aspsms>\r\n'
		+ '<Userkey>' + options.userkey + '</Userkey>\r\n'
		+ '<Password>' + options.password + '</Password>\r\n'
		+ '<Originator>' + options.originator + '</Originator>\r\n'
		+ '<Recipient>\r\n'
		+ '<PhoneNumber>' + options.recipient + '</PhoneNumber>\r\n'
		+ '</Recipient>\r\n'
		+ '<MessageData>' + message + '</MessageData>\r\n'
		+ '<Action>SendTextSMS</Action>\r\n'
		+ '</aspsms>';

	request({
		'method' : 'POST', 
		'uri' : 'http://xml1.aspsms.com/xmlsvr.asp', 
		'headers' : {
			'Content-Type' : 'text/xml', 
			'Content-Length' : xml.length
		}, 
		'body' : xml
	}, function (error, response, body) {
		if (response.statusCode == 200) {
			var errorCode = /<ErrorCode>([0-9]+)<\/ErrorCode>/.exec(body)[1];
			var errorDescription = /<ErrorDescription>([^<]+)<\/ErrorDescription>/.exec(body)[1];

			var error = null;
			if (errorCode != '1') {
				error = {
					'code' : errorCode, 
					'description' : errorDescription
				};
			}

			callback(error);
		}
	});
};

var showCredits = function (options, callback) {
	for (var key in _defaultOptions) {
		options[key] = options[key] || _defaultOptions[key];

		options[key] = options[key].replace(/&/g, '&#38;');
		options[key] = options[key].replace(/</g, '&#60;');
		options[key] = options[key].replace(/>/g, '&#62;');
	}

	var xml = '<?xml version="1.0" encoding="ISO-8859-1"?>\r\n'
		+ '<aspsms>\r\n'
		+ '<Userkey>' + options.userkey + '</Userkey>\r\n'
		+ '<Password>' + options.password + '</Password>\r\n'
		+ '<Action>ShowCredits</Action>\r\n'
		+ '</aspsms>';

	request({
		'method' : 'POST', 
		'uri' : 'http://xml1.aspsms.com/xmlsvr.asp', 
		'headers' : {
			'Content-Type' : 'text/xml', 
			'Content-Length' : xml.length
		}, 
		'body' : xml
	}, function (error, response, body) {
		if (response.statusCode == 200) {
			var errorCode = parseInt(/<ErrorCode>([0-9]+)<\/ErrorCode>/.exec(body)[1]);
			var errorDescription = /<ErrorDescription>([^<]+)<\/ErrorDescription>/.exec(body)[1];

			var error = null;
			if (errorCode != '1') {
				error = {
					'code' : errorCode, 
					'description' : errorDescription
				};
			}

			var credits = parseInt(/<Credits>([0-9]+)<\/Credits>/.exec(body)[1]);

			callback(error, credits);
		}
	});
}

exports.setDefaultOptions = setDefaultOptions;
exports.send = send;
exports.showCredits = showCredits;
