(function() {
  angular.module('memPeeps.auth')
    .config(configuration);

    configuration.$inject = ['$authProvider'];

    function configuration($authProvider) {
      $authProvider.configure({
        apiUrl: 'http://localhost:3000/api'
      });
    }

})();