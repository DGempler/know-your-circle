(function() {
  angular.module('memPeeps.users')
    .controller('editProfileController', editProfileController);

  editProfileController.$inject=['$rootScope', 'AuthFactory'];

  function editProfileController($rootScope, AuthFactory) {
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

    vm.submitUpdateUserAccount = function() {
      console.log(vm.user.deleteImage);
      console.log(vm.user.image);
      if (vm.user.image) {
        AuthFactory.updateUserWithImage(vm.user);
      } else {
        if (vm.user.deleteImage) {
          vm.user.image= null;
        }
        AuthFactory.updateUser(vm.user);
      }

    };

    vm.changePassword = function() {
      AuthFactory.openChangePasswordModal();
    };

    copyUser();
  }

})();