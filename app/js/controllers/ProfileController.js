'use strict';

// TODO: only the dependency to Profile should be here, the others are just for testing
zxApiClient.controller('ProfileController', function ProfileController($scope, Profile, Product, Programs, ProgramApplication, Report) {
        var profile = Profile.query({}, 
          function() {
            console.log('Got profile: ', profile.profileItem[0]);

            $scope.profile = profile.profileItem[0];
          }, 
          function() {
          	console.log('onError for profile, TODO: this is the error callback and i do not understand why it is fired');
            console.log('Got profile: ', profile.profileItem[0]);

            $scope.profile = profile.profileItem[0];
          }
        );

        // TODO: just for testing
        var products = Product.query({}, 
          function() {
            console.log('Got products: ', products);
          }, 
          function(error) {
          	console.log('onError for products: ', error);
          }
        );

        var programs = Programs.query({}, 
//          function() {
          function() {
            console.log('Got programs: ', programs);
//            console.log('Got program data: ', data);
          }, 
          function(error) {
          	console.log('onError for programs: ', error);
          }
        );

        var programApplications = ProgramApplication.query({}, 
          function() {
            console.log('Got program applications: ', programApplications);
          }, 
          function(error) {
          	console.log('onError for program applications, TODO: this is the error callback and i do not understand why it is fired: ', error);
          }
        );

        var report = Report.query({}, 
          function() {
            console.log('Got report: ', report);
          }, 
          function(error) {
          	console.log('onError for report, TODO: this is the error callback and i do not understand why it is fired:', error);
          }
        );
});
