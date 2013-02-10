var util = require('util');

// see https://github.com/milewise/node-soap, install with 'npm install soap'
var soap = require('soap');

var getZanoxConnectSession = function(authToken, publicKey, signature, nonce, timestamp) {
  var url = 'https://auth.zanox.com/wsdl/2011-05-01';
  var args = {authToken: authToken, publicKey: publicKey, signature: signature, nonce: nonce, timestamp: timestamp};
  console.log('*****');
  console.log(args);
  soap.createClient(url, function(err, client) {
  	//console.log(client);
  	//client.describe();
      client.getSession(args, function(err, result) {
      	  //console.log(util.inspect(result, showHidden=false, depth=4, colorize=true));
          console.log(result);
          //console.log(err);
      });
  });
};

module.exports = getZanoxConnectSession;

/*var soap = require('soap');
  var url = 'http://www.webservicex.net/geoipservice.asmx?WSDL';
  //var args = {programs: '660', connectid: '580599047DF8F5311043'};
  var args = {};
  soap.createClient(url, function(err, client) {
  	//console.log(client);
  	//client.describe();
      client.GetGeoIPContext(args, function(err, result) {
      	console.log(util.inspect(result, showHidden=false, depth=4, colorize=true));

          //console.log(result);
          //console.log(err);
      });
  });*/
