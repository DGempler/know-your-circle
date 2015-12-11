(function() {
  angular.module('memPeeps.users')
    .controller('changePasswordController', changePasswordController);

    changePasswordController.$inject = ['$uibModalInstance', 'UserFactory'];

    function changePasswordController($uibModalInstance, UserFactory) {
      var vm = this;

      vm.closeModal = function() {
        $uibModalInstance.close();
      };

      vm.submitChangePassword = function() {
        UserFactory.submitChangePassword(vm.user, $uibModalInstance);
      };

    }

})();