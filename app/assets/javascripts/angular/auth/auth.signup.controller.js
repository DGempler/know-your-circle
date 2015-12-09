(function() {
  angular.module('memPeeps.auth')
    .controller('signupController', signupController);

    signupController.$inject = ['$uibModalInstance', '$auth', 'AuthFactory', '$uibModal'];

    function signupController($uibModalInstance, $auth, AuthFactory, $uibModal) {
      var vm = this;
      vm.user = {};

      vm.signUp = function() {
        $auth.submitRegistration(vm.user)
          .then(function(resp) {
            $uibModalInstance.close();
            alert("A confirmation email has been sent to " + resp.data.data.email);
          })
          .catch(function(error) {
            alert("There was an error! Please try again!");
          });
      };

      vm.logInOpen = function() {
        $uibModalInstance.close();
        AuthFactory.logInOpen();
      };
    }

})();