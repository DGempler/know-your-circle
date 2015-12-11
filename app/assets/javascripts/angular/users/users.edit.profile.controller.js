(function() {
  angular.module('memPeeps.users')
    .controller('editProfileController', editProfileController);

  editProfileController.$inject=['$rootScope', 'UserFactory'];

  function editProfileController($rootScope, UserFactory) {
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

    vm.submitUpdateUserAccount = function() {
      if (vm.user.image) {
        UserFactory.updateUserWithImage(vm.user);
      } else {
        UserFactory.updateUser(vm.user);
      }

    };

    vm.changePassword = function() {
      UserFactory.openChangePasswordModal();
    };

    copyUser();
  }

})();