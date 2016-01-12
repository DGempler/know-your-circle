(function() {
  angular.module('knowYourCircle.auth')
    .controller('loginController', loginController);

    loginController.$inject = ['$uibModalInstance','AuthFactory', '$location'];

    function loginController($uibModalInstance, AuthFactory, $location) {
      var vm = this;
      vm.user = {};

      function logInSuccess() {
        $uibModalInstance.close();
        $location.path('/people/index');
      }

      function logInError(failure) {
        vm.failureToggle = !vm.failureToggle;
        vm.error = failure.errors[0];
      }

      vm.logIn = function(isValid) {
        if (isValid) {
          vm.busy = true;
          AuthFactory.logIn(vm.user)
            .then(function() {
              logInSuccess();
            })
            .catch(function(failure) {
              logInError(failure);
            })
            .finally(function() {
              vm.busy = false;
            });
        }
      };

      vm.openSignUpModal = function() {
        AuthFactory.openSignUpModal($uibModalInstance);
      };

    }

})();