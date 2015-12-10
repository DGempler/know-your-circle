(function() {
  angular.module('memPeeps.users')
    .controller('editProfileController', editProfileController);

  editProfileController.$inject=['$rootScope', '$auth', 'Upload', '$location'];

  function editProfileController($rootScope, $auth, Upload, $location) {
    var vm = this;
    vm.user = {};

    function copyUser() {
      for (var prop in $rootScope.user) {
        vm.user[prop] = $rootScope.user[prop];
      }
      if ($rootScope.user.dob) {
        vm.user.dob = new Date($rootScope.user.dob);
      }
    }

    copyUser();

    vm.submitUserUpdateAccount = function() {
      if (vm.user.image) {
        uploadUpload();
      } else {
        regularUserUpdate();
      }

    };

    function uploadUpload() {
      Upload.upload({
          url: 'api/auth',
          method: 'PUT',
          fields: vm.user,
          arrayKey: '[]',
          file: vm.user.image,
          fileFormDataName: 'user[image]',
        })
        .then(function (resp) {
          $location.path('/profile');
        }, function (resp) {
            console.log('err');
            console.log(resp);
        });

    }

    function regularUserUpdate() {
      $auth.updateAccount(vm.user)
        .then(function(res) {
          $location.path('/profile');
        })
        .catch(function(err) {
          console.log(err);
        });
    }

  }

})();