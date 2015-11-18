angular.module('memPeeps.people')
.factory('Person', Person);

Person.$inject = ['$resource'];

function Person($resource) {
  return $resource('//localhost:3000/api/people/:id');
}