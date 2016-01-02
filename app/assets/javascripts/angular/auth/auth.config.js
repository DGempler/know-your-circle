(function() {
  angular.module('knowYourCircle.auth')
    .config(configuration);

    configuration.$inject = ['$authProvider'];

    function configuration($authProvider) {
      $authProvider.configure({
        apiUrl: '/api',
        confirmationSuccessUrl: window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/#/profile/edit/true'
      });
    }

})();