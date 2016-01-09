(function() {
  angular.module('knowYourCircle.auth')
    .controller('signupController', signupController);

    signupController.$inject = ['$uibModalInstance', 'email', 'AuthFactory', 'Message'];

    function signupController($uibModalInstance, email, AuthFactory, Message) {
      var vm = this;
      vm.user = {};

      if (email) {
        vm.alreadyHasEmail = true;
        vm.user.email = email;
      }

      vm.signUp = function(isValid) {
        if (isValid) {
          vm.busy = true;
          AuthFactory.signUp(vm.user)
            .then(function(email) {
              $uibModalInstance.close();
              if (vm.alreadyHasEmail) {
                window.location.href = '/#/profile/edit/true';
              } else {
                Message.open(null, email);
              }
            })
            .catch(function(failure) {
              vm.failureToggle = !vm.failureToggle;
              if (failure.data.errors) {
                vm.error = failure.data.errors.full_messages[0];
              } else {
                // failure.statusText;
                vm.error = "An error occured";
                vm.refresh = true;
              }
            })
            .finally(function() {
              vm.busy = false;
            });
        }
      };

      vm.openLogInModal = function() {
        AuthFactory.openLogInModal($uibModalInstance);
      };

    }

})();