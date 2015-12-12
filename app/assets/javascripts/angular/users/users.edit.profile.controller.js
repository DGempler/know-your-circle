(function() {
  angular.module('memPeeps.users')
    .controller('editProfileController', editProfileController);

  editProfileController.$inject=['$rootScope', 'UserFactory', 'AuthFactory'];

  function editProfileController($rootScope, UserFactory, AuthFactory) {
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
        AuthFactory.updateUserWithImage(vm.user);
      } else {
        AuthFactory.updateUser(vm.user);
      }

    };

    vm.changePassword = function() {
      AuthFactory.openChangePasswordModal();
    };

    copyUser();
  }

})();