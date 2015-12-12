(function() {
  angular.module('memPeeps.auth')
    .controller('signupController', signupController);

    signupController.$inject = ['$uibModalInstance', 'AuthFactory'];

    function signupController($uibModalInstance, AuthFactory) {
      var vm = this;
      vm.user = {};

      vm.signUp = function(isValid) {
        if (isValid) {
          AuthFactory.signUp(vm.user, $uibModalInstance)
            .catch(function(failure) {
              vm.failureToggle = !vm.failureToggle;
              vm.error = failure.data.errors.full_messages[0];
            });
        }
      };

      vm.openLogInModal = function() {
        AuthFactory.openLogInModal($uibModalInstance);
      };

    }

})();