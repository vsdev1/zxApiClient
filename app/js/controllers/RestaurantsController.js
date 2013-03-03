'use strict';

foodMeApp.controller('RestaurantsController',
    function RestaurantsController(zxConnectAuth, $scope, customer, $location, $window, Restaurant, zxConnect, zxConnectSessionFacade, Profile, signature) {

/*  //if (!customer.password) {
  var zxConnectCredentials = zxConnect.getCredentials();
  if (zxConnectCredentials.connectId === undefined || zxConnectCredentials.secretKey === undefined) {
    console.log($location.absUrl());
    //var authtoken = $location.search()['authtoken'];
    var authtoken = getParameter('authtoken');
    //console.log('authtoken: ', authtoken);
    //console.log($location.routeParams());
    if (authtoken !== undefined) {
      // remove last 2 letters from authtoken (comes from angular: #/)
      authtoken = authtoken.substr(0, authtoken.length - 2);
      console.log('authtoken: ', authtoken);
      
      // TODO: get zx connect session and set it to zxConnect service
      var zxConnectSession = zxConnectSessionFacade.get({authtoken:authtoken}, function() {
        console.log('got zx connect session for authtoken: ', authtoken);
        console.log('********* zxConnectSession: ', zxConnectSession);
        zxConnect.setCredentials(zxConnectSession.connectId, zxConnectSession.secretKey);

        // TODO: get the user profile (create profile service that calls the publisher api via nodejs proxy)
        var uriPath = '/profiles'
        var signatureHolder = signature.createSignature('GET', uriPath, zxConnect.getCredentials().secretKey);

        var profile = Profile.get({connectid : zxConnect.getCredentials().connectId, date : signatureHolder.timestamp, "signature": signatureHolder.signature, nonce: signatureHolder.nonce},
          function() {
            console.log('Got profile: ', profile.profileItem[0]);
          }
        );
      });
    } else {
      // redirect to the zanox connect login page
      //console.log($location.absUrl());
      console.log('redirect to zx login page');
      $window.location = 'https://auth.zanox.com/login?appid=D71378049E083896051C&callback=' + $location.absUrl();
      //$location.url('/customer');
    } 
  }*/

  /*THIS FUNCTION IS TO FETCH STRING PARAMETER*/
 function getParameter(param) {
    var val = document.URL;
    var indexOfParam = val.indexOf(param);
    if (indexOfParam === -1) {
      return undefined;
    }
    var url = val.substr(indexOfParam)  
    var n=url.replace(param+"=","");
    //alert(n); 
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
