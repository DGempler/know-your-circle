(function() {
  angular.module('memPeeps.users')
    .controller('changePasswordController', changePasswordController);

    changePasswordController.$inject = ['$uibModalInstance', '$auth', '$rootScope'];

    function changePasswordController($uibModalInstance, $auth, $rootScope) {
      var vm = this;

      // vm.user = {};

      // function copyUser() {
      //   for (var prop in $rootScope.user) {
      //     vm.user[prop] = $rootScope.user[prop];
      //   }
      // }

      // copyUser();

      vm.closeModal = function() {
        $uibModalInstance.close();
      };

      vm.submitChangePassword = function() {
        $auth.updateAccount(vm.user)
          .then(function(res) {
            $uibModalInstance.close();
            $location.path('/profile');
          })
          .catch(function(err) {
            $uibModalInstance.close();
            console.log(err);
          });
      };

    }

})();