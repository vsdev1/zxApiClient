'use strict';

foodMeApp.controller('CustomerController',
    function CustomerController($scope, customer, $location) {

  $scope.customerName = customer.name;
  $scope.customerPassword = customer.password;


  $scope.login = function(customerName, customerPassword) {
    customer.name = customerName;
    customer.password = customerPassword;

    $location.url('/');
  };
});
