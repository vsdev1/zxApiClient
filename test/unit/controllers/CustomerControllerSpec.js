'use strict';

describe('CustomerController', function() {
  var customer, scope;

  beforeEach(module(function($provide) {
    customer = {
      name: 'Bob Green',
      password: '123 Main St; Anytown AB 12345'
    };
    $provide.value('customer', customer);
  }));

  beforeEach(inject(function($controller) {
    $controller('CustomerController', {$scope: scope = {}});
  }));


  it('should set customerName and customerPassword from customer service', function() {
    expect(scope.customerName).toEqual('Bob Green');
    expect(scope.customerPassword).toEqual('123 Main St; Anytown AB 12345');
  });


  describe('login', function() {

    it('should save customer name and password to customer', function() {
      scope.login('newName', 'newPassword');

      expect(customer.name).toEqual('newName');
      expect(customer.password).toEqual('newPassword');
    });


    it('should redirect the user to restaurant list', inject(function($location) {
      $location.url('/customer');
      expect($location.url()).toEqual('/customer');

      scope.login('newName', 'newAddress');
      expect($location.url()).toEqual('/');
    }));
  });
});
