(function() {
  angular.module('knowYourCircle.users')
    .controller('changePasswordController', changePasswordController);

    changePasswordController.$inject = ['$uibModalInstance', 'AuthFactory', 'Message'];

    function changePasswordController($uibModalInstance, AuthFactory, Message) {
      var vm = this;

      function submitChangePasswordSuccess() {
        vm.closeModal();
        var message = "Your password has been successfully updated.";
        Message.open(message);
      }

      function submitChangePasswordError(failure) {
        vm.failureToggle = !vm.failureToggle;
        vm.error = failure.data.errors.full_messages[0];
      }

      function submitChangePassword() {
        vm.busy = true;
        AuthFactory.submitChangePassword(vm.user)
          .then(function() {
            submitChangePasswordSuccess();
          })
          .catch(function(failure) {
            submitChangePasswordError(failure);
          })
          .finally(function() {
            vm.busy = false;
          });
      }

      vm.closeModal = function() {
        $uibModalInstance.close();
      };

      vm.submitChangePassword = function(isValid) {
        if (isValid) {
          submitChangePassword();
        }
      };

    }

})();