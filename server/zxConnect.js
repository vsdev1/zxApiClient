var html = require('fs').readFileSync(__dirname + '/index.html')
     , http = require('http')
     , config = require('./config')
     , events = require('events')
     , crypto = require('crypto')
     , hat = require('hat')
     , logly = require( 'logly' )
     , os = require( 'os' );
     


/**
*
* Set up the application.
*
*/   
// Setting up logging.
logly.name( 'zxConnect' );
logly.mode( 'debug' );
logly.color(true);
logly.date(true);

/**
*
* Utility methods
*
*/
// Utility method to build the request needed to make a call to the publisher API.
var buildHttpRequestOptions = function(page, date) {

     logly.log("Calling buildHttpRequestOptions() with the parameter : page:" + page + " and date :" + date);
     
     var path = "/" + config.api.datatype + "/" + config.api.api_version + config.api.sales_uri + date + "?items=50&page=" + page;
     var nonce = hat(4 * 20);
     
     var signature = getAuthorization(config.api.verb, config.api.sales_uri + date, getDate(), nonce, config.api.secret_key);
     var authorization = config.api.prefix_signature + " " + config.api.connect_id + ":" + signature;
     
     return options = {
           host : config.api.host,
           path : path,
           method : config.api.verb,
           headers : {
                'Host' : config.api.host,
                'Date' : getDate(),
                'Nonce' : nonce,
                'Authorization' : authorization
           }
     };
};

// Utility method to get the date in the correct format.
var getDate = function () {
     return new Date().toUTCString();
};

// Utility method to build the signature, needed to authentify to the publisher API.
var getAuthorization = function (verb, uri, timestamp, nonce, secret) {
     var hmac,
     signature;
     signature = verb + uri + timestamp + nonce;
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