/*
https://github.com/substack/node-hat
*/
var html = http = require('http')
     , config = require('./config')
     , events = require('events')
     , crypto = require('crypto')
     , hat = require('hat')
     , logly = require( 'logly' )
     , os = require( 'os' );
     


/**
*
* see http://wiki.zanox.com/en/SOAP_API_authentication_with_zanoxConnect
*
*/   
// Setting up logging.
logly.name( 'zxConnect' );
logly.mode( 'debug' );
logly.color(true);
//logly.date(true);

/**
*
* Utility methods
*
*/
// Utility method to build the request needed to make a call to the publisher API.
var buildHttpRequestOptions = function() {

     logly.log('Calling buildHttpRequestOptions()');
     
     var serviceName = 'connectservice';
     var methodName = 'getsession';
     var nonce = hat(4 * 20);
     var date = getDate();

     var signature = getAuthorization(serviceName, methodName, date, nonce, 'config.api.secret_key');
     
     return options = {
           serviceName : serviceName,
           methodName : methodName,
           nonce : nonce,
           timestamp : date,
           signature : signature
     };
};

// Utility method to get the date in the correct format.
var getDate = function () {
    var date = new Date();
    return date.getUTCFullYear() + '-' + (date.getUTCMonth() + 1) + '-' + date.getUTCDate() + 'T' + date.getUTCHours() + ':' + date.getUTCMinutes() + ':' + date.getUTCSeconds();
     //return new Date().toUTCString();
};

// Utility method to build the signature, needed to authentify to the publisher API.
var getAuthorization = function (serviceName, methodName, timestamp, nonce, secret) {
     var hmac,
     signature;
     signature = serviceName + methodName + timestamp + nonce;
     console.log('signature base string: ', signature);
     hmac = crypto.createHmac('sha1', secret);
     hmac.update(signature);
     return hmac.digest('base64');
};

// Utility method to add a Zero at the beginning of a number.
var pad = function (val, len) {
	val = String(val);
	len = len || 2;
	while (val.length < len) val = "0" + val;
	return val;
};

console.log('signature: ', buildHttpRequestOptions());