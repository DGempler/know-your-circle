(function() {
  angular.module('memPeeps.auth')
    .controller('logOutSuccessController', logOutSuccessController);

    logOutSuccessController.$inject = ['$uibModalInstance'];

    function logOutSuccessController($uibModalInstance) {
      var vm = this;

      vm.close = function() {
        $uibModalInstance.close();
      };

    }


})();