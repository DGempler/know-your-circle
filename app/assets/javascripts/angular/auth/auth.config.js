(function() {
  angular.module('memPeeps.auth')
    .config(configuration);

    configuration.$inject = ['$authProvider'];

    function configuration($authProvider) {
      $authProvider.configure({
        apiUrl: 'https://knowyourcircle.herokuapp.com/api',
        confirmationSuccessUrl: 'http://localhost:3000/#/profile/edit'
      });
    }

})();