(function() {
  angular.module('memPeeps.auth')
    .controller('signupController', signupController);

    signupController.$inject = ['$uibModalInstance', '$auth'];

    function signupController($uibModalInstance, $auth) {
      var vm = this;
      vm.user = {};

      vm.signup = function() {
        $auth.submitRegistration(vm.user)
          .then(function(resp) {
            console.log(resp);
          })
          .catch(function(error) {
            console.log(error);
          });
      };



    }

})();