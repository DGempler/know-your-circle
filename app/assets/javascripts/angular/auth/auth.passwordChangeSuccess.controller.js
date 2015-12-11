(function() {
  angular.module('memPeeps.auth')
    .controller('passwordChangeSuccessController', passwordChangeSuccessController);

    passwordChangeSuccessController.$inject = ['$uibModalInstance'];

    function passwordChangeSuccessController($uibModalInstance) {
      var vm = this;

      vm.close = function() {
        $uibModalInstance.close();
      };

    }

})();