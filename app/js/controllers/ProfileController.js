'use strict';

zxApiClient.controller('ProfileController', function ProfileController($scope, Profile) {
        var profile = Profile.query({}, 
          function() {

            console.log('Got profile: ', profile.profileItem[0]);

            $scope.profile = profile.profileItem[0];
          }, 
          function() {
          	console.log('TODO: this is the error callback and i do not understand why it is fired');
          	
            console.log('Got profile: ', profile.profileItem[0]);

            $scope.profile = profile.profileItem[0];

          }
        );
});
