'use strict';

// inject this module in app.js
angular.module('auth', [], function($provide) {

  // http://wiki.zanox.com/en/RESTful_API_V20110301
  // http://wiki.zanox.com/en/API_Most_Frequent_Use_Cases
  /**
   * Creates the signature for restful zanox api calls.
   */
  $provide.factory('signature', function() {
    function createSignature(httpVerb, uriPath, secretKey) {
      var timestamp = createTimestamp();
      var nonce = createNonce();
      var input = createInput(httpVerb, uriPath, timestamp, nonce);
      // example for an input: GET/profilesMon, 09 Jun 2008 08:17:35 GMT01234567890123456789
      var signature = createSignatureForInput(input, secretKey);
      
      var returnValue = {signature: signature, timestamp: timestamp, nonce: nonce};
      console.log('signature:',returnValue);
      return returnValue;
    }
    
    function createInput(httpVerb, uriPath, timeStamp, nonce) {
      var input = httpVerb + uriPath.toLowerCase() + timeStamp + nonce;
      console.log('input=' + input);

      return input;
    }

    function createSignatureForInput(input, secretKey){
      var sha1 = Crypto.SHA1;
      var hmacBytes = Crypto.HMAC(sha1, input, secretKey, { asBytes: true });
      return Crypto.util.bytesToBase64(hmacBytes);
    }
    
    function createNonce() {
      var currentTime = new Date().getTime();
      var randomNumber = Math.abs(Math.random());

      var input = currentTime.toString() + randomNumber.toString();

      var nonce = createHexMd5(input);
      console.log('nonce=' + nonce);
      
      return nonce; 
    }

    function createHexMd5(input){
      return hex_md5(input);
    }
    
    function createTimestamp() {
      var date = new Date()
      var gmtDateString = date.toGMTString()
      
      console.log('GMT date string=' + gmtDateString);
      return gmtDateString;
    }

    return {
      createSignature: createSignature
    };
  });

  $provide.factory('zxConnect', function($http) {
    var connectId;
    var secretKey;
    var getCredentials1 = function() {
      return {connectId: that.connectId, secretKey: that.secretKey};
    };

    var that = this;

    return {
      getCredentials: function() {
        return {connectId: that.connectId, secretKey: that.secretKey};
      }, 
      getCredentialsByAuthToken: function(authToken) {
        if (that.connectId !== undefined && that.secretKey !== undefined) {
          return getCredentials1();
        } else {
          // create the credentials by zanox connect and return them
          var url = '/api/zxConnect/' + authToken;
          // TODO: use post instead, see http://www.yearofmoo.com/2012/08/use-angularjs-to-power-your-web-application.html
          $http.get(url).success(function(data, status) {
            console.log('Got zx connect session for authToken ' + authToken + ': ', data);
            console.log('Set the zx connect credentials.')
            that.connectId = data.connectId
            that.secretKey = data.secretKey;

            return getCredentials1();
          }).error(function(data, status) {
            throw 'Error with status ' + status + ' while getting the zanox connect credentials for authToken ' + authToken 
              + '. Returned data are: ' + data;
          });
        }
      }
    };
  });

  /**
   * Makes sure that a non-authenticated user is redirected to the zanox connect login page.
   * Inject this service in every controller (TODO: find central injection point).
   */
  $provide.factory('gateKeeper', function($location, $window, zxConnect) {

    // utility function that extracts a string parameter from the URL
    function getParameter(param) {
      var val = document.URL;
      var indexOfParam = val.indexOf(param);
      if (indexOfParam === -1) {
        return undefined;
      }
      var url = val.substr(indexOfParam)  
      var n = url.replace(param+"=","");
      return n;
    }

    var zxConnectCredentials = zxConnect.getCredentials();
    if (zxConnectCredentials.connectId === undefined || zxConnectCredentials.secretKey === undefined) {
      var authtoken = getParameter('authtoken');
      if (authtoken !== undefined) {
        // remove last 2 letters from authtoken (comes from angular: #/)
        authtoken = authtoken.substr(0, authtoken.length - 2);
        console.log('authtoken: ', authtoken);
        
        // check the zanox connect credentials
        zxConnect.getCredentialsByAuthToken(authtoken);
      } else {
        // redirect to the zanox connect login page
        var loginPageUrl = 'https://auth.zanox.com/login?appid=D71378049E083896051C&callback=' + $location.absUrl();
        console.log('redirect to zx login page: ' + loginPageUrl);
        $window.location = loginPageUrl;
      }
    } 
  });

});
