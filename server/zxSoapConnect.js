/*
https://github.com/substack/node-hat
*/
var html = http = require('http')
     , config = require('./config')          
     , soap = require('soap') // see https://github.com/milewise/node-soap, install with 'npm install soap'
     , events = require('events')
     , crypto = require('crypto')
     , hat = require('hat')
     , logly = require( 'logly' )
     , util = require('util')
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

     var signature = getAuthorization(serviceName, methodName, date, nonce, config.api.secret_key);
     
     var options = {
           serviceName : serviceName,
           methodName : methodName,
           nonce : nonce,
           timestamp : date,
           signature : signature
     };

     console.log('options: ', options);

     return options;
};

// Utility method to get the date in the correct format.
var getDate = function () {
    var date = new Date();
    var month = getWithLeadingZero((date.getUTCMonth() + 1));
    console.log(date.getUTCMonth() + 1);
    console.log(month.length);
    return date.getUTCFullYear() + '-' + month + '-' + getWithLeadingZero(date.getUTCDate()) + 'T' + getWithLeadingZero(date.getUTCHours()) + ':' + getWithLeadingZero(date.getUTCMinutes()) + ':' + getWithLeadingZero(date.getUTCSeconds());
     //return new Date().toUTCString();
};

var getWithLeadingZero = function(number) {
    number = "" + number;
    if (number.length === 1) {
        return "0" + number;
    }
    return number;
}

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


var getZanoxConnectSession = function(authToken, publicKey, signature, nonce, timestamp, res) {
  var url = 'https://auth.zanox.com/wsdl/2011-05-01';
  var args = {authToken: authToken, publicKey: publicKey, signature: signature, nonce: nonce, timestamp: timestamp};
  console.log('*****');
  console.log(args);
  soap.createClient(url, function(err, client) {
    //console.log(client);
    //client.describe();
      client.getSession(args, function(err, result) {
        console.log(typeof err);
        if (!err) {
          console.log(util.inspect(result, showHidden=false, depth=4, colorize=true));
          var credentials = {
            connectId: result.session[0].connectId,
            secretKey: result.session[0].secretKey[0]
          };
          console.log('zx connect credentials: ', credentials);
          res.send(200, credentials);
        } else {
          console.log(util.inspect(err, showHidden=false, depth=4, colorize=true));
          //console.log(err);
          console.log(err);
          res.send(500, err);
        }
      });
  });
};

var execute = function (authToken, res) {
    var signature = buildHttpRequestOptions();
    console.log('signature: ', signature);

    console.log(config.api.public_key);

    //var authToken = '28CED514E67BD089C14B2FF4883909DE98F57614144A0EE58BE3F8B0885A2D86'; 
    getZanoxConnectSession(authToken, config.api.public_key, signature.signature, signature.nonce, signature.timestamp, res);

    console.log('Done!');
}

module.exports = execute;

