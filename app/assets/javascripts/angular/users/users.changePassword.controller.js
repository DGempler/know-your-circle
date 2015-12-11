(function() {
  angular.module('memPeeps.users')
    .controller('changePasswordController', changePasswordController);

    changePasswordController.$inject = ['$uibModalInstance', '$auth', '$rootScope', '$location'];

    function changePasswordController($uibModalInstance, $auth, $rootScope, $location) {
      var vm = this;

      vm.closeModal = function() {
        $uibModalInstance.close();
      };

      vm.submitChangePassword = function() {
        $auth.updatePassword(vm.user)
          .then(function(res) {
            $uibModalInstance.close();
            console.log('success!');
          })
          .catch(function(err) {
            $uibModalInstance.close();
            console.log(err);
          });
      };

    }

})();