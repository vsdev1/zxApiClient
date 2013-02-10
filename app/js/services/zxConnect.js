'use strict';

foodMeApp.factory('zxConnect', function() {
  var connectId;
  var secretKey;

  var that = this;

  return {
  	setCredentials: function(connectId, secretKey) {
      console.log('Set the zx connect credentials.')
  		that.connectId = connectId;
  		that.secretKey = secretKey;
  	},
  	getCredentials: function() {
  		return {connectId: that.connectId, secretKey: that.secretKey};
  	} 	
  };
});
