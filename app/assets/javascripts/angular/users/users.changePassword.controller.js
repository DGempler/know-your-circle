(function() {
  angular.module('knowYourCircle.users')
    .controller('changePasswordController', changePasswordController);

    changePasswordController.$inject = ['$uibModalInstance', 'AuthFactory', 'Message'];

    function changePasswordController($uibModalInstance, AuthFactory, Message) {
      var vm = this;

      vm.closeModal = function() {
        $uibModalInstance.close();
      };

      vm.submitChangePassword = function(isValid) {
        if (isValid) {
          vm.busy = true;
          AuthFactory.submitChangePassword(vm.user)
            .then(function() {
              $uibModalInstance.close();
              var message = "Your password has been successfully updated.";
              Message.open(message);
            })
            .catch(function(failure) {
              vm.failureToggle = !vm.failureToggle;
              vm.error = failure.data.errors.full_messages[0];
            })
            .finally(function() {
              vm.busy = false;
            });
        }
      };

    }

})();