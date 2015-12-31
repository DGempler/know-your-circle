(function() {
  angular.module('knowYourCircle.auth')
    .controller('signupController', signupController);

    signupController.$inject = ['$uibModalInstance', 'email', 'AuthFactory'];

    function signupController($uibModalInstance, email ,AuthFactory) {
      var vm = this;
      vm.user = {};

      if (email) {
        vm.alreadyHasEmail = true;
        vm.user.email = email;
      }

      vm.signUp = function(isValid) {
        if (isValid) {
          AuthFactory.signUp(vm.user, $uibModalInstance)
            .catch(function(failure) {
              vm.failureToggle = !vm.failureToggle;
              if (failure.data.errors) {
                vm.error = failure.data.errors.full_messages[0];
              } else {
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