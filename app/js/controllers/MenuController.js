'use strict';

zxApiClient.controller('MenuController',
    function MenuController($scope, $routeParams, Restaurant, cart) {

  $scope.restaurant = Restaurant.get({id: $routeParams.restaurantId});
  $scope.cart = cart;

});
