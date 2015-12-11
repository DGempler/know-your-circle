(function() {
  angular.module('memPeeps.users')
    .controller('profileController', profileController);

  profileController.$inject = ['$rootScope', '$auth', '$location', 'UserFactory'];

function profileController($rootScope, $auth, $location, UserFactory) {
    var vm = this;
    vm.user = {};

    function copyUser() {
      for (var prop in $rootScope.user) {
        vm.user[prop] = $rootScope.user[prop];
      }
      if ($rootScope.user.dob === 'null' || $rootScope.user.dob === null) {
        vm.user.dob = "";
      } else {
        vm.user.dob = moment($rootScope.user.dob).format("MMM Do YYYY");
      }
    }

    copyUser();

    vm.deleteUser = function() {
      var areYouSure = confirm("Are you sure you want to delete your account and your whole circle?");
      if (areYouSure) {
        UserFactory.deleteUser();
      }
    };

    vm.changePassword = function() {
      UserFactory.openChangePasswordModal();
    };

  }

})();