(function() {
  angular.module('knowYourCircle.users')
    .controller('editProfileController', editProfileController);

  editProfileController.$inject=['$rootScope', 'AuthFactory', '$auth', '$routeParams', 'UserFactory'];

  function editProfileController($rootScope, AuthFactory, $auth, $routeParams, UserFactory) {
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
      if ($routeParams.first === "true") {
        var name = vm.user.first_name + " " + vm.user.last_name;
        UserFactory.welcomeModalOpen(name);
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
        vm.busy = true;
        if (vm.user.image) {
          var submitUser = removeNullValues();
          AuthFactory.updateUserWithImage(submitUser)
            .then(function() {
              $location.path('/profile');
            })
            .catch(function() {
              var message = 'An error occured while trying to update your information. Please try again.';
              AuthFactory.messageModalOpen(message);
            })
            .finally(function() {
              vm.busy = false;
            };
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