'use strict';

// TODO: use post instead, see http://www.yearofmoo.com/2012/08/use-angularjs-to-power-your-web-application.html
zxApiClient.factory('zxConnectSessionFacade', function($resource) {
  return $resource('/api/zxConnect/:authtoken', {id: '@authoken'});
});

var publisherApiBasePath = '/api/publisher/'
zxApiClient.factory('Profile', function($resource, signature, zxConnect) {
	var uriPath = publisherApiBasePath + 'profiles/';
	//var signatureHolder = signature.createSignature('GET', uriPath, zxConnect.getCredentials().secretKey);

	var resource = $resource(uriPath, { },
  	{
    get : { method : 'GET', isArray : false, encoding:true} 
  	});

  	return resource;

/*  	resource.
  return $resource(uriPath, { },
  {
    get : { method : 'GET', params: {connectid : zxConnect.getCredentials().connectId, date : signatureHolder.timestamp, "signature": signatureHolder.signature, nonce: signatureHolder.nonce}, isArray : true, encoding:true} 
  });*/
}); 

// for token handler see: http://stackoverflow.com/questions/11176330/angularjs-how-to-send-auth-token-with-resource-requests
