'use strict';

foodMeApp.factory('zxConnectSessionFacade', function($resource) {
  return $resource('/api/zxConnect/:authtoken', {id: '@authoken'});
});
