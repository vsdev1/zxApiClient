'use strict';

foodMeApp.factory('zxConnectSessionFacade', function($resource) {
  return $resource('/api/zxConnect/:id', {id: '@id'});
});
