(function() {
  angular.module('memPeeps.auth')
    .controller('loginController', loginController);

    loginController.$inject = ['$uibModalInstance', '$auth', 'AuthFactory'];

    function loginController($uibModalInstance, $auth, AuthFactory) {
      var vm = this;
      vm.user = {};

      vm.logIn = function() {
        $auth.submitLogin(vm.user)
          .then(function(resp) {
            $uibModalInstance.close();
            alert("Thank you for logging in!");
            console.log(resp);
          })
          .catch(function(error) {
            alert("Sorry, there was an error.");
            console.log(error);
          });
      };

      vm.signUpOpen = function() {
        $uibModalInstance.close();
        AuthFactory.signUpOpen();
      };

    }


})();