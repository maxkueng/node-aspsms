node-aspsms
===========

A partial implementation of the [aspsms.com][aspsms] XML SMS API for
[node.js][node]. 

Installation
------------

    sudo npm install aspsms

Methods
-------

 - `setDefaultOptions(options)` Sets the default options
 - `send(options, callback, message)` Sends a text message
 - `showCredits(options, callback, message)` Returns the amount of credits left

Options
-------

 - `userkey` Your ASPSMS Uesrkey
 - `password` Your ASPSMS password
 - `originator` Name of the sender
 - `recipient` Mobile phone number of the recipient

Examples
--------

Send a text message

```javascript
var aspsms = require('aspsms');

aspsms.setDefaultOptions({
	'userkey' : 'YOUR_ASPSMS_USERKEY', 
	'password' : 'YOUR_ASPSMS_PASSWORD', 
	'originator' : 'TestApp'
});

aspsms.send({
	'recipient' : '+41555123456'

}, function (error) {
	if (!error) {
		console.log('Success!');
	}
	
}, 'Hello, this is a test.');
```

Show hwo many credits I have left

```javascript
var aspsms = require('aspsms');

aspsms.setDefaultOptions({
	'userkey' : 'YOUR_ASPSMS_USERKEY', 
	'password' : 'YOUR_ASPSMS_PASSWORD', 
});

aspsms.showCredits({ }, function (error, credits) {
	if (!error) {
		console.log('You have ' + credits + ' left');
	}
	
});
```
If you don't want to use `setDefaultOptions` you can pass all options in each
command.

```javascript
var aspsms = require('aspsms');

aspsms.send({
	'userkey' : 'YOUR_ASPSMS_USERKEY', 
	'password' : 'YOUR_ASPSMS_PASSWORD', 
	'originator' : 'TestApp', 
	'recipient' : '+41555123456'

}, function (error) {
	if (!error) {
		console.log('Success!');
	}
	
}, 'Hello, this is a test.');
```


[aspsms]: http://www.aspsms.com/
[node]: http://nodejs.org/
