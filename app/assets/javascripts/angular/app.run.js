angular.module('knowYourCircle')
  .run(run);

  run.$inject = ['$rootScope', 'AuthFactory', 'UserFactory'];

  function run($rootScope, AuthFactory, UserFactory) {
    $rootScope.$on("auth:email-confirmation-success", function(ev, data) {
      var name = data.first_name + " " + data.last_name;
      UserFactory.welcomeModalOpen(name);
    });

    $rootScope.$on("auth:email-confirmation-error", function(ev, data) {
      var message = "There was an error. Please try again.";
      AuthFactory.messageModalOpen(message);
    });
  }