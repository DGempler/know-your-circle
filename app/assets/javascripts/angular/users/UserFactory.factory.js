(function() {
  angular.module('memPeeps.users')
    .factory('UserFactory', UserFactory);

    UserFactory.$inject = ['$uibModal', '$auth', '$location', '$rootScope', 'Upload'];

    function UserFactory($uibModal, $auth, $location, $rootScope, Upload) {
      var factory = {};

      factory.updateUser = function(user) {
        $auth.updateAccount(user)
          .then(function(res) {
            $location.path('/profile');
          })
          .catch(function(err) {
            $location.path('/profile');
            console.log(err);
          });
      };

      factory.updateUserWithImage = function(user) {
        Upload.upload({
          url: 'api/auth',
          method: 'PUT',
          headers: $auth.retrieveData('auth_headers'),
          fields: user,
          arrayKey: '[]',
          file: user.image,
          fileFormDataName: 'user[image]',
        })
        .then(function (resp) {
          $rootScope.user = resp.data.data;
          $location.path('/profile');
        }, function (err) {
            console.log('err');
            console.log(err);
        });
      };

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