'use strict';

function getParameter(param) {
            var val = document.URL;
            var url = val.substr(val.indexOf(param))  
            var n=url.replace(param+"=","");
            //alert(n);
            return n; 
}

foodMeApp.controller('RestaurantsController',
    function RestaurantsController($scope, customer, $location, $window, Restaurant, zxConnect, zxConnectSessionFacade) {

  //if (!customer.password) {
  var zxConnectCredentials = zxConnect.getCredentials();
  if (zxConnectCredentials.connectId === undefined || zxConnectCredentials.secretKey === undefined) {
    console.log($location.absUrl());
<<<<<<< HEAD
    //var authtoken = $location.search()['authtoken'];
    var authtoken = getParameter('authtoken');
    //console.log('authtoken: ', authtoken);
    //console.log($location.routeParams());
    if (authtoken !== undefined) {
      // remove last 2 letters from authtoken (comes from angular: #/)
      authtoken = authtoken.substr(0, authtoken.length - 2);
=======
    //console.log($location.url());
    var authtoken = getParameter('authtoken');
    // remove #/:
    authtoken = authtoken.substring(0, authtoken.length - 2);
    console.log(authtoken.length);
    //console.log($location.routeParams());
    if (authtoken.length > 0) { // TODO: check for undefined, null etc.
>>>>>>> 628341dd24ea4970f34ff51608c87af1b39f1364
      console.log('authtoken: ', authtoken);
      
      // TODO: get zx connect session and set it to zxConnect service
      var zxConnectSession = zxConnectSessionFacade.get({id:authtoken}, function() {
        console.log('got zx connect session for authtoken: ', authtoken);
      });
      console.log('zxConnectSession: ', zxConnectSession);
    } else {
      // redirect to the zanox connect login page
      //console.log($location.absUrl());
      console.log('redirect to zx login page');
<<<<<<< HEAD
      $window.location = 'https://auth.zanox.com/login?appid=D71378049E083896051C&callback=' + $location.absUrl();
=======
      //var absUrl = $location.absUrl();
      //absUrl = absUrl.substring(0, absUrl.length - 2);
      //console.log('https://auth.zanox.com/login?callback=' + absUrl);
      
      $window.location = 'https://auth.zanox.com/login?callback=' + $location.absUrl();
>>>>>>> 628341dd24ea4970f34ff51608c87af1b39f1364
      //$location.url('/customer');
    } 
  }

  /*THIS FUNCTION IS TO FETCH STRING PARAMETER*/
 function getParameter(param) {
    var val = document.URL;
    var indexOfParam = val.indexOf(param);
    if (indexOfParam === -1) {
      return undefined;
    }
    var url = val.substr(indexOfParam)  
    var n=url.replace(param+"=","");
    alert(n); 
    return n;
 }

  var filter = $scope.filter = {
    cuisine: [],
    price: null,
    rating: null
  };

  var allRestaurants = Restaurant.query(filterAndSortRestaurants);
  $scope.$watch('filter', filterAndSortRestaurants, true);

  function filterAndSortRestaurants() {
    $scope.restaurants = [];

    // filter
    angular.forEach(allRestaurants, function(item, key) {
      if (filter.price && filter.price !== item.price) {
        return;
      }

      if (filter.rating && filter.rating !== item.rating) {
        return;
      }

      if (filter.cuisine.length && filter.cuisine.indexOf(item.cuisine) === -1) {
        return;
      }

      $scope.restaurants.push(item);
    });


    // sort
    $scope.restaurants.sort(function(a, b) {
      if (a[filter.sortBy] > b[filter.sortBy]) {
        return filter.sortAsc ? 1 : -1;
      }

      if (a[filter.sortBy] < b[filter.sortBy]) {
        return filter.sortAsc ? -1 : 1;
      }

      return 0;
    });
  };


  $scope.sortBy = function(key) {
    if (filter.sortBy === key) {
      filter.sortAsc = !filter.sortAsc;
    } else {
      filter.sortBy = key;
      filter.sortAsc = true;
    }
  };

  $scope.sortIconFor = function(key) {
    if (filter.sortBy !== key) {
      return '';
    }

    return filter.sortAsc ? '\u25B2' : '\u25BC';
  };


  $scope.CUISINE_OPTIONS = {
    african: 'African',
    american: 'American',
    barbecue: 'Barbecue',
    cafe: 'Cafe',
    chinese: 'Chinese',
    'czech/slovak': 'Czech / Slovak',
    german: 'German',
    indian: 'Indian',
    japanese: 'Japanese',
    mexican: 'Mexican',
    pizza: 'Pizza',
    thai: 'Thai',
    vegetarian: 'Vegetarian'
  };

});
