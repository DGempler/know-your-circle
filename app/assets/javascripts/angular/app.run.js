angular.module('knowYourCircle')
  .run(run);

  run.$inject = ['$rootScope', 'Message', 'UserFactory'];

  function run($rootScope, Message, UserFactory) {
    $rootScope.$on("auth:email-confirmation-error", function(ev, data) {
      var message = "There was an error. Please refresh and try again.";
      Message.messageModalOpen(message);
    });
  }