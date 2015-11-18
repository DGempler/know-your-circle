angular.module('memPeeps')
.factory('Person', ['$resource', function($resource) {
  return $resource('//localhost:3000/api/people/:id');
}]);