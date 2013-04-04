'use strict';

zxApiClient.controller('ThankYouController', function ThankYouController($scope, $routeParams) {
  $scope.orderId = $routeParams.orderId;
});
