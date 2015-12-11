(function() {
  angular.module('memPeeps.users')
    .controller('changePasswordController', changePasswordController);

    changePasswordController.$inject = ['$uibModalInstance', 'UserFactory', 'AuthFactory'];

    function changePasswordController($uibModalInstance, UserFactory, AuthFactory) {
      var vm = this;

      vm.closeModal = function() {
        $uibModalInstance.close();
      };

      vm.submitChangePassword = function() {
        AuthFactory.submitChangePassword(vm.user, $uibModalInstance);
      };

    }

})();