(function() {
  angular.module('knowYourCircle.auth')
    .config(configuration);

    configuration.$inject = ['$authProvider'];

    function configuration($authProvider) {
      $authProvider.configure({
        apiUrl: '/api',
        confirmationSuccessUrl: '/#/profile/edit?first=true'
      });
    }

})();