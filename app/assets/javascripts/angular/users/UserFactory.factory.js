(function() {
  angular.module('memPeeps.users')
    .factory('UserFactory', UserFactory);

    UserFactory.$inject = ['$uibModal', '$auth', '$location', '$rootScope', 'Upload'];

    function UserFactory($uibModal, $auth, $location, $rootScope, Upload) {
      var factory = {};

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

      return factory;
    }

})();