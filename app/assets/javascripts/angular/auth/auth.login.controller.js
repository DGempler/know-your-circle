(function() {
  angular.module('knowYourCircle.auth')
    .controller('loginController', loginController);

    loginController.$inject = ['$uibModalInstance','AuthFactory'];

    function loginController($uibModalInstance, AuthFactory) {
      var vm = this;
      vm.user = {};

      vm.logIn = function(isValid) {
        if (isValid) {
          vm.busy = true;
          AuthFactory.logIn(vm.user)
            .then(function() {
              $uibModalInstance.close();
              $location.path('/people/index');
            })
            .catch(function(failure) {
              vm.failureToggle = !vm.failureToggle;
              vm.error = failure.errors[0];
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