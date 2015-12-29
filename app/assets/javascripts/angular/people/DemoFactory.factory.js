(function() {
  angular.module('knowYourCircle.people')
    .factory('DemoFactory', DemoFactory);

  DemoFactory.$inject = ['$http', '$q'];

  function DemoFactory($http, $q) {
    var demoFactory = {};

    demoFactory.getGuestUserPeople = function() {
      var deferred = $q.defer();

      $http.get('/api/demo/').then(function(guestUserPeople) {
        demoFactory.guestUserPeople = guestUserPeople;
        deferred.resolve(demoFactory.guestUserPeople);
      }, function(err) {
        deferred.reject(err);
      });
      return deferred.promise;
    };

    return demoFactory;
  }
})();