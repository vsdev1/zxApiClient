'use strict';

zxApiClient.factory('customer', function($rootScope, localStorage) {

  var LOCAL_STORAGE_ID = 'fmCustomer',
      customerString = localStorage[LOCAL_STORAGE_ID];

  var customer = customerString ? JSON.parse(customerString) : {
    name: undefined,
    password: undefined
  };

  $rootScope.$watch(function() { return customer; }, function() {
    localStorage[LOCAL_STORAGE_ID] = JSON.stringify(customer);
  }, true);

  return customer;
});
