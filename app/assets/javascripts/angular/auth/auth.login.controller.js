(function() {
  angular.module('memPeeps.auth')
    .controller('loginController', loginController);

    loginController.$inject = ['$uibModalInstance','AuthFactory'];

    function loginController($uibModalInstance, AuthFactory) {
      var vm = this;
      vm.user = {};

      vm.logIn = function(isValid) {
        if (isValid) {
          AuthFactory.logIn(vm.user, $uibModalInstance);
        }
      };

      vm.openSignUpModal = function() {
        AuthFactory.openSignUpModal($uibModalInstance);
      };

    }

})();