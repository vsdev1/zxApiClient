'use strict';

/* zanox publisher API facade */

angular.module('publisherApi', ['ngResource'], function($provide) {

	  var publisherApiBasePath = '/api/publisher/';

	  $provide.factory('Product', function($resource, TokenHandler){
	  		//TODO: hard-coded values just for testing
	  		//http://api.zanox.com/xml/2011-03-01/products?programs=2157&q=iphone&connectid=A5FD46643F4AD67F6671
		    var resource = $resource(publisherApiBasePath + 'products/', {programs: 2157, q: 'iphone'},  {
		    	query : {method:'GET', params:{}, isArray:false, encoding:true},
		    });
		    
		    resource = TokenHandler.wrapActions(resource, ["query"]);

  			return resource;
		});
		
		$provide.factory('Profile', function($resource, TokenHandler){
		    var resource = $resource(publisherApiBasePath + 'profiles/' , {}, {
		    	query : {method:'GET', params:{}, isArray:false, encoding:true, uri: 'GET/profiles/'},
		    });
		    
		    resource = TokenHandler.wrapSignatureActions(resource, ["query"], ["GET"] , ["/profiles"]);

  			return resource;
		});

	    $provide.factory('Balance', function($resource, TokenHandler){
		    var resource = $resource(publisherApiBasePath + 'payments/balances/' , {}, {
		    	query : {method:'GET', params:{}, isArray:false, encoding:true},
		    });
		    
		    resource = TokenHandler.wrapSignatureActions( resource, ["query"] , ["GET"], ["/payments/balances"]);

  			return resource;
		});	
		
		$provide.factory('BankAccounts', function($resource, TokenHandler){
		    var resource = $resource(publisherApiBasePath + 'payments/bankaccounts/' , {}, {
		    	query : {method:'GET', params:{}, isArray:false, encoding:true},
		    });
		    
		    resource = TokenHandler.wrapSignatureActions( resource, ["query"] , ["GET"], ["/payments/bankaccounts"]);

  			return resource;
		});	
		$provide.factory('ProgramApplication', function($resource, TokenHandler){
		    var resource = $resource(publisherApiBasePath + 'programapplications/' , {}, {
		    	query : {method:'GET', params:{}, isArray:false, encoding:true},
		    });
		    
		    resource = TokenHandler.wrapSignatureActions( resource, ["query"] , ["GET"], ["/programapplications"]);

  			return resource;
		});
		$provide.factory('Report', function($resource, TokenHandler){
		    var resource = $resource(publisherApiBasePath + 'reports/basic/' , {}, {
		    	query : {method:'GET', params:{currency:'EUR',groupby:'month',fromdate:'2012-01-01', todate:'2012-12-02'}, isArray:false, encoding:true},
		    });
		    
		    resource = TokenHandler.wrapSignatureActions( resource, ["query"] , ["GET"], ["/reports/basic"]);

  			return resource;
		});
		
	  $provide.factory('Programs', function($resource, TokenHandler){
		    var resource = $resource(publisherApiBasePath + 'programs/' , {}, {
		    	get : {method:'GET', params:{}, isArray:false, encoding:true}
		    });
		    
		    resource = TokenHandler.wrapActions(resource, ["query"]);

  			return resource;
		});
		
	  $provide.factory('TokenHandler', function(zxConnect, signature) {
		  var tokenHandler = {};

		  // wraps given actions of a resource to send auth token
		  // with every request
		  tokenHandler.wrapActions = function(resource, actions) {
		    // copy original resource
		    var wrappedResource = resource;
		    // loop through actions and actually wrap them
		    for (var i=0; i < actions.length; i++) {
		      tokenWrapper( wrappedResource, actions[i] );
		    };
		    // return modified copy of resource
		    return wrappedResource;
		  };
		  
		    // wraps resource action to send request with auth token
		  var tokenWrapper = function(resource, action) {
		    // copy original action
		    resource['_' + action]  = resource[action];
		    // create new action wrapping the original
		    // and sending token
		    resource[action] = function(data, success, error){
		      return resource['_' + action](
		        // call action with provided data and
		        // appended access_token
		        angular.extend({}, data || {},
		        	// TODO: this is just for testing products, the line below is the correct one
		          {connectId: 'A5FD46643F4AD67F6671'}),
//		          {connectId: zxConnect.getCredentials().connectId}),
		        success,
		        error
		      );
		    };
		  };
		  
		  // wraps given actions of a resource to send auth token
		  // with every request
		  tokenHandler.wrapSignatureActions = function(resource, actions, protocols, uris) {
		    // copy original resource
		    var wrappedResource = resource;
		    // loop through actions and actually wrap them
		    for (var i=0; i < actions.length; i++) {
		      tokenWrapperSignature(wrappedResource, actions[i], protocols[i], uris[i]);
		    };
		    // return modified copy of resource
		    return wrappedResource;
		  };
		  
		    // wraps resource action to send request with auth token
		  var tokenWrapperSignature = function(resource, action, protocol, uri) {
		    // copy original action
		    resource['_' + action]  = resource[action];
		    // create new action wrapping the original
		    // and sending token
		    
		    resource[action] = function(data, header, success, error) {
		      var signatureHolder = signature.createSignature(protocol, uri, zxConnect.getCredentials().secretKey)
		      return resource['_' + action](
		        // call action with provided data and
		        // appended access_token
		        angular.extend({}, data || {},
		          {connectId: zxConnect.getCredentials().connectId, nonce : signatureHolder.nonce, date : signatureHolder.timestamp, signature: signatureHolder.signature}),
		        //headers: { 'Auth-Nonce-Response': 'adad'},
		        success,
		        error
		      );
		    };
		  };

		  return tokenHandler;
		});
	});
