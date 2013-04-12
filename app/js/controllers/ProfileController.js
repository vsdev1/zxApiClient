'use strict';

//dependency to Product is just for testing
zxApiClient.controller('ProfileController', function ProfileController($scope, Profile, Product, Programs) {
        var profile = Profile.query({}, 
          function() {
            console.log('Got profile: ', profile.profileItem[0]);

            $scope.profile = profile.profileItem[0];
          }, 
          function() {
          	console.log('onError, TODO: this is the error callback and i do not understand why it is fired');
            console.log('Got profile: ', profile.profileItem[0]);

            $scope.profile = profile.profileItem[0];

          }
        );

        // TODO: just for testing
        var products = Product.query({}, 
          function() {
            console.log('Got products: ', products);
          }, 
          function() {
          	console.log('onError');
          }
        );

        var programs = Programs.query({}, 
          function() {
            console.log('Got programs: ', programs);
          }, 
          function() {
          	console.log('onError');
          }
        );
});
