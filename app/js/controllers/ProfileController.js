'use strict';

// TODO: only the dependency to Profile should be here, the others are just for testing
zxApiClient.controller('ProfileController', function ProfileController($scope, Profile, Product, Programs, ProgramApplication, Report, Balance, BankAccounts) {
        var profile = Profile.query({}, 
          function() {
            console.log('Got profile: ', profile.profileItem[0]);

            $scope.profile = profile.profileItem[0];
          }, 
          function(error) {
          	console.log('onError for profile, TODO: this is the error callback and i do not understand why it is fired: ', error);
            console.log('Got profile in error callback: ', profile.profileItem[0]);

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

        var balance = Balance.query({}, 
          function() {
            console.log('Got balance: ', balance);
          }, 
          function(error) {
          	console.log('onError for balance, TODO: this is the error callback and i do not understand why it is fired:', error);
          }
        );
        var bankAccounts = BankAccounts.query({}, 
          function() {
            console.log('Got bank accounts: ', bankAccounts);
          }, 
          function(error) {
          	console.log('onError for bank accounts, TODO: this is the error callback and i do not understand why it is fired:', error);
          }
        );
});

// this is for minified angularJS script
ProfileController.$inject = ['$scope', 'Profile', 'Product', 'Programs', 'ProgramApplication', 'Report', 'Balance', 'BankAccounts'];

