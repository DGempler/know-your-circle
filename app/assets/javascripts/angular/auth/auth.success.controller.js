(function() {
  angular.module('memPeeps.auth')
    .controller('successController', successController);

    successController.$inject = ['$uibModalInstance', 'message'];

    function successController($uibModalInstance, message) {
      var vm = this;

      vm.message = message;

      vm.close = function() {
        $uibModalInstance.close();
      };

    }


})();