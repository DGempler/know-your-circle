(function() {
  angular.module('memPeeps.auth')
    .controller('confirmEmailController', confirmEmailController);

    confirmEmailController.inject = ['$uibModalInstance', 'email'];

    function confirmEmailController($uibModalInstance, email) {
      var vm = this;
      vm.email = email;
      console.log(vm.email);

      vm.close = function() {
        $uibModalInstance.close();
      };
    }

})();