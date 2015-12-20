(function() {
  angular.module('memPeeps.auth')
    .config(configuration);

    configuration.$inject = ['$authProvider'];

    function configuration($authProvider) {
      $authProvider.configure({
        apiUrl: process.env.PORT + '/api' || "//localhost:3000/api",
        confirmationSuccessUrl: 'http://localhost:3000/#/profile/edit'
      });
    }

})();