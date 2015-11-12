angular.module('memPeeps')
  .factory('Person', ['$resource', function($resource) {
    return $resource('//localhost:3000/api/people');
  }])
  .factory('PersonFactory', ['Person', function(Person) {
    var personFactory = {};

    // personFactory.people = Person.query();

    return personFactory;
  }]);
