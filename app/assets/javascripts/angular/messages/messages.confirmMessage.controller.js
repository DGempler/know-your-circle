(function() {
  angular.module('knowYourCircle.messages')
    .controller('confirmMessageController', confirmMessageController);

    confirmMessageController.$inject = ['$uibModalInstance', 'message'];

    function confirmMessageController($uibModalInstance, message) {
      var vm = this;

      vm.message = message;

      vm.cancel = function() {
        $uibModalInstance.dismiss();
      };

      vm.confirm = function() {
        $uibModalInstance.close();
      };

    }

})();