'use strict';

// inject this service in all controllers
// TODO: inject into central point
foodMeApp.factory('zxConnectAuth', function($location, $window, zxConnect, zxConnectSessionFacade, Profile, signature) {

  var zxConnectCredentials = zxConnect.getCredentials();
  if (zxConnectCredentials.connectId === undefined || zxConnectCredentials.secretKey === undefined) {
    var authtoken = getParameter('authtoken');
    if (authtoken !== undefined) {
      // remove last 2 letters from authtoken (comes from angular: #/)
      authtoken = authtoken.substr(0, authtoken.length - 2);
      console.log('authtoken: ', authtoken);
      
      // get zx connect session and set it to zxConnect service
      var zxConnectSession = zxConnectSessionFacade.get({authtoken:authtoken}, function() {
        console.log('got zx connect session for authtoken ' + authtoken + ': ', zxConnectSession);
        zxConnect.setCredentials(zxConnectSession.connectId, zxConnectSession.secretKey);

        // get the user profile via profile service that calls the publisher api via nodejs proxy
        var uriPath = '/profiles'
        var signatureHolder = signature.createSignature('GET', uriPath, zxConnect.getCredentials().secretKey);

        var profile = Profile.get({connectid : zxConnect.getCredentials().connectId, date : signatureHolder.timestamp, "signature": signatureHolder.signature, nonce: signatureHolder.nonce},
          function() {
            console.log('Got profile: ', profile.profileItem[0]);
          }
        );
      });
    } else {
      // redirect to the zanox connect login page
      var loginPageUrl = 'https://auth.zanox.com/login?appid=D71378049E083896051C&callback=' + $location.absUrl();
      console.log('redirect to zx login page: ' + loginPageUrl);
      $window.location = loginPageUrl;
    }
  } 

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

});
