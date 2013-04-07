'use strict';

// DEPRECATED: use zxPublisherApiFacade instead (when fully implemented)
var publisherApiBasePath = '/api/publisher/'
zxApiClient.factory('Profile', function($resource) {
	var uriPath = publisherApiBasePath + 'profiles/';

	var resource = $resource(uriPath, { },
  	{
      get : { method : 'GET', isArray : false, encoding:true} 
  	});

  	return resource;
}); 

// for token handler see: http://stackoverflow.com/questions/11176330/angularjs-how-to-send-auth-token-with-resource-requests

