var request = require('request');

var _defaultOptions = {};

var setDefaultOptions = function (options) {
	_defaultOptions = options;
};

var send = function (options, callback, message) {
	options.userkey = options.userkey || _defaultOptions.userkey;
	options.password = options.password || _defaultOptions.password;
	options.originator = options.originator || _defaultOptions.originator;
	options.recipient = options.recipient || _defaultOptions.recipient;

	var xml = '<aspsms>'
		+ '<Userkey>' + options.userkey + '</Userkey>'
		+ '<Password>' + options.password + '</Password>'
		+ '<Originator>' + options.originator + '</Originator>'
		+ '<Recipient>'
		+ '<PhoneNumber>' + options.recipient + '</PhoneNumber>'
		+ '</Recipient>'
		+ '<MessageData>' + message + '</MessageData>'
		+ '<Action>SendTextSMS</Action>'
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
		callback();
	});
};

exports.setDefaultOptions = setDefaultOptions;
exports.send = send;
