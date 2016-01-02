angular.module('knowYourCircle')
  .run(run);

  run.$inject = ['$rootScope', 'AuthFactory', 'UserFactory'];

  function run($rootScope, AuthFactory, UserFactory) {
    $rootScope.$on("auth:email-confirmation-error", function(ev, data) {
      var message = "There was an error. Please try again.";
      AuthFactory.messageModalOpen(message);
    });
  }