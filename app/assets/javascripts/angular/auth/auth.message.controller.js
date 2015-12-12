(function() {
  angular.module('memPeeps.auth')
    .controller('messageController', messageController);

    messageController.$inject = ['$uibModalInstance', 'message'];

    function messageController($uibModalInstance, message) {
      var vm = this;

      vm.message = message;

      vm.close = function() {
        $uibModalInstance.close();
      };

    }


})();