'use strict';

// TODO: only the dependency to Profile should be here, the others are just for testing
zxApiClient.controller('ProfileController', function ProfileController($scope, Profile, Product, Programs, ProgramApplication, Report, Balance, BankAccounts, Incentives, ExclusiveIncentives) {
        var profile = Profile.query({}, 
          function() {
            console.log('Got profile: ', profile.profileItem[0]);

            $scope.profile = profile.profileItem[0];
          }, 
          function(error) {
          	console.log('onError for profile: ', error);
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
          	console.log('onError for program applications: ', error);
          }
        );

        var report = Report.query({}, 
          function() {
            console.log('Got report: ', report);
          }, 
          function(error) {
          	console.log('onError for report: ', error);
          }
        );

        var balance = Balance.query({}, 
          function() {
            console.log('Got balance: ', balance);
          }, 
          function(error) {
          	console.log('onError for balance: ', error);
          }
        );
        var bankAccounts = BankAccounts.query({}, 
          function() {
            console.log('Got bank accounts: ', bankAccounts);
          }, 
          function(error) {
          	console.log('onError for bank accounts: ', error);
          }
        );
        var incentives = Incentives.query({}, 
          function() {
            console.log('Got incentives: ', incentives);
          }, 
          function(error) {
          	console.log('onError for incentives: ', error);
          }
        );
        var exclusiveIncentives = ExclusiveIncentives.query({}, 
          function() {
            console.log('Got exclusiveIncentives: ', exclusiveIncentives);
          }, 
          function(error) {
          	console.log('onError for exclusiveIncentives: ', error);
          }
        );
});

// this is for minified angularJS script
//ProfileController.$inject = ['$scope', 'Profile', 'Product', 'Programs', 'ProgramApplication', 'Report', 'Balance', 'BankAccounts'];

