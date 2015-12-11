(function() {
  angular.module('memPeeps.users')
    .factory('UserFactory', UserFactory);

    UserFactory.$inject = ['$uibModal'];

    function UserFactory($uibModal) {
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

      return factory;
    }

})();