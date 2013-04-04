'use strict';

zxApiClient.controller('ProfileController', function RestaurantsController(zxConnectAuth, zxConnect, signature, $scope, Profile) {

        // get the user profile via profile service that calls the publisher api via nodejs proxy
        var uriPath = '/profiles'
        var signatureHolder = signature.createSignature('GET', uriPath, zxConnect.getCredentials().secretKey);

        var profile = Profile.get({connectid : zxConnect.getCredentials().connectId, date : signatureHolder.timestamp, "signature": signatureHolder.signature, nonce: signatureHolder.nonce},
          function() {
            console.log('Got profile: ', profile.profileItem[0]);

            $scope.profile = profile.profileItem[0];
          }
        );

});
