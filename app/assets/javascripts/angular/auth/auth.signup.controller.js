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
              if (failure.data.errors)
                vm.error = failure.data.errors.full_messages[0];
              else {
                // failure.statusText;
                vm.error = "An error occured";
                vm.refresh = true;
              }
            });
        }
      };

      vm.openLogInModal = function() {
        AuthFactory.openLogInModal($uibModalInstance);
      };

    }

})();