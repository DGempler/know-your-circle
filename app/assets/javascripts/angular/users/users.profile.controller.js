(function() {
  angular.module('memPeeps.users')
    .controller('profileController', profileController);

  profileController.$inject=['$rootScope', '$auth', 'Upload'];

  function profileController($rootScope, $auth, Upload) {
    var vm = this;
    vm.user = $rootScope.user;
    if ($rootScope.user.dob) {
      vm.user.dob = new Date($rootScope.user.dob);
    }
    console.log(vm.user);

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
            console.log(resp);
        }, function (resp) {
            console.log('err');
            console.log(resp);
        });

    }

    function regularUserUpdate() {
      $auth.updateAccount(vm.user)
        .then(function(res) {
          vm.user = res.data.data;
          if (res.data.data.dob) {
            vm.user.dob = new Date(res.data.data.dob);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }

  }

})();