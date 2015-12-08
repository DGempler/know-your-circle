(function() {
  angular.module('memPeeps.auth')
    .controller('loginController', loginController);

    loginController.$inject = ['$uibModalInstance'];

    function loginController($uibModalInstance) {
      var vm = this;
      vm.user = {};


      vm.close = function() {
        uibModalInstance.close();
      };

      vm.login = function() {
        console.log(vm.user.email);
        console.log(vm.user.password);
      }



    }


})();