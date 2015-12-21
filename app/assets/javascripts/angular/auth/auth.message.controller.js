(function() {
  angular.module('knowYourCircle.auth')
    .controller('messageController', messageController);

    messageController.$inject = ['$uibModalInstance', 'message', 'email'];

    function messageController($uibModalInstance, message, email) {
      var vm = this;

      if (message) {
        vm.message = message;
      } else {
        vm.message = "A confirmation email has been sent to ";
        vm.email = email;
      }

      vm.close = function() {
        $uibModalInstance.close();
      };

    }


})();