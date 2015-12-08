(function() {
  angular.module('memPeeps.auth')
    .controller('loginController', loginController);

    loginController.$inject = ['$uibModalInstance'];

    function loginController($uibModalInstance) {
      var vm = this;
      vm.person = {};

      vm.close = function() {
        uibModalInstance.close();
      };



    }


})();