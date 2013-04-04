'use strict';

zxApiClient.factory('Restaurant', function($resource) {
  return $resource('/api/restaurant/:id', {id: '@id'});
});
