(function() {
  angular.module('memPeeps.users')
    .factory('UserFactory', UserFactory);

    UserFactory.$inject = ['$uibModal', '$auth', '$location'];

    function UserFactory($uibModal, $auth, $location) {
      var factory = {};

      factory.openChangePasswordModal = function() {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'partials/users/_changePassword_modal.html',
          controller: 'changePasswordController as password',
          size: 'sm',
          windowClass: "modal fade"
        });
      };

      factory.deleteUser = function() {
        $auth.destroyAccount()
        .then(function(res) {
          console.log(res);
          $location.path('/');
        })
        .catch(function(err) {
          console.log(err);
          $location.path('/');
        });
      };

      return factory;
    }

})();