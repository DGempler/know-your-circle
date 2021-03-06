(function() {
  angular.module('knowYourCircle.messages')
    .controller('welcomeController', welcomeController);

    welcomeController.$inject = ['$uibModalInstance', 'name'];

    function welcomeController($uibModalInstance, name) {
      var vm = this;
      vm.name = name;

      vm.close = function() {
        $uibModalInstance.close();
      };

    }

})();