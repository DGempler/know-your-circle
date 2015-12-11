(function() {
  angular.module('memPeeps.auth')
    .controller('loginController', loginController);

    loginController.$inject = ['$uibModalInstance','AuthFactory'];

    function loginController($uibModalInstance, AuthFactory) {
      var vm = this;
      vm.user = {};

      vm.logIn = function(isValid) {
        if (isValid) {
          AuthFactory.logIn(vm.user, $uibModalInstance)
            .catch(function(failure) {
              vm.error = failure.errors[0];
            });
        }
      };

      vm.openSignUpModal = function() {
        AuthFactory.openSignUpModal($uibModalInstance);
      };

    }

})();