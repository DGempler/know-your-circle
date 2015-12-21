(function() {
  angular.module('knowYourCircle.people')
  .factory('Person', Person);

  Person.$inject = ['$resource'];

  function Person($resource) {
    return $resource('/api/people/:id', null, {
          update: {
        method:'PUT'
      }
    });
  }
})();