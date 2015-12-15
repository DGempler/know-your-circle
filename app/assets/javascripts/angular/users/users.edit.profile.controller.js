(function() {
  angular.module('memPeeps.users')
    .controller('editProfileController', editProfileController);

  editProfileController.$inject=['$rootScope', 'AuthFactory', '$auth'];

  function editProfileController($rootScope, AuthFactory, $auth) {
    var vm = this;
    vm.user = {};

    function copyUser() {
      for (var prop in $rootScope.user) {
        vm.user[prop] = $rootScope.user[prop];
      }
      if ($rootScope.user.dob) {
        vm.user.dob = new Date($rootScope.user.dob);
      }
      if (!vm.user.image_updated_at) {

      }
    }

    function removeNullValues() {
      var newUser = {};
      for (var prop in vm.user) {
        if (vm.user[prop] || $rootScope.user[prop]) {
          newUser[prop] = vm.user[prop];
        }
      }
      return newUser;
    }

    vm.submitUpdateUserAccount = function(isValid) {
      if (isValid) {
        if (vm.user.image) {
          var submitUser = removeNullValues();
          AuthFactory.updateUserWithImage(submitUser);
        } else {
          if (vm.user.deleteImage) {
            vm.user.image= null;
          }
          AuthFactory.updateUser(vm.user);
        }
      }
    };

    vm.changePassword = function() {
      AuthFactory.openChangePasswordModal();
    };

    copyUser();
  }

})();