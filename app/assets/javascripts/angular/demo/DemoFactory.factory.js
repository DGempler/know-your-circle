(function() {
  angular.module('knowYourCircle.demo')
    .factory('DemoFactory', DemoFactory);

  DemoFactory.$inject = ['$http', '$q'];

  function DemoFactory($http, $q) {
    var demoFactory = {};

    demoFactory.getGuestUserPeople = function() {
      var deferred = $q.defer();

      $http.get('/api/demo/').then(function(guestUserPeople) {
        demoFactory.guestUserPeople = guestUserPeople.data;
        deferred.resolve(demoFactory.guestUserPeople);
      }, function(err) {
        deferred.reject(err);
      });

      return deferred.promise;
    };

    demoFactory.getGuestUserPerson = function(id) {
      var deferred = $q.defer();

      $http.get('/api/demo/' + id).then(function(guestUserPerson) {
        deferred.resolve(guestUserPerson.data);
      }, function(err) {
        deferred.reject(err);
      });

      return deferred.promise;
    };

    return demoFactory;
  }

})();