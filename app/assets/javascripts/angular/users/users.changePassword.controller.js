(function() {
  angular.module('knowYourCircle.users')
    .controller('changePasswordController', changePasswordController);

    changePasswordController.$inject = ['$uibModalInstance', 'AuthFactory'];

    function changePasswordController($uibModalInstance, AuthFactory) {
      var vm = this;

      vm.closeModal = function() {
        $uibModalInstance.close();
      };

      vm.submitChangePassword = function(isValid) {
        if (isValid) {
          AuthFactory.submitChangePassword(vm.user, $uibModalInstance)
            .catch(function(failure) {
              vm.failureToggle = !vm.failureToggle;
              vm.error = failure.data.errors.full_messages[0];
            });
        }
      };

    }

})();