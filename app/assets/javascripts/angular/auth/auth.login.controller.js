(function() {
  angular.module('memPeeps.auth')
    .controller('loginController', loginController);

    loginController.$inject = ['$uibModalInstance', '$auth'];

    function loginController($uibModalInstance, $auth) {
      var vm = this;
      vm.user = {};


      vm.close = function() {
        $uibModalInstance.close();
      };

      vm.login = function() {
        $auth.submitLogin(vm.user)
          .then(function(resp) {
            $uibModalInstance.close();
            alert("Thank you for logging in!");
            console.log(resp);
          })
          .catch(function(error) {
            alert("Sorry, there was an error.");
            console.log(error);
          });
      }
    }


})();