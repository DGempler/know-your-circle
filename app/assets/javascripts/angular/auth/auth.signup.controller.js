(function() {
  angular.module('memPeeps.auth')
    .controller('signupController', signupController);

    signupController.$inject = ['$uibModalInstance'];

    function signupController($uibModalInstance) {
      var vm = this;
      var user = {};

      vm.signup = function() {
        console.log(vm.user.email);
        console.log(vm.user.password);
        console.log(vm.user.confirmationPassword);
      }



    }

})();