(function() {
  angular.module('memPeeps.auth')
    .factory('AuthFactory', AuthFactory);

    AuthFactory.$inject = ['$q'];

    function AuthFactory($q) {
      var factory = {};

      return factory;
    }



})();