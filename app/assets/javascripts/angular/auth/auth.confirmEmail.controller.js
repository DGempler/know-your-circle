(function() {
  angular.module('knowYourCircle.auth')
    .controller('confirmEmailController', confirmEmailController);

    confirmEmailController.inject = ['$uibModalInstance', 'email'];

    function confirmEmailController($uibModalInstance, email) {
      var vm = this;
      vm.email = email;

      vm.close = function() {
        $uibModalInstance.close();
      };
    }

})();