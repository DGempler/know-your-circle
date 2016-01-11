(function() {
  angular.module('knowYourCircle.users')
    .controller('editProfileController', editProfileController);

  editProfileController.$inject=['$rootScope', 'AuthFactory', '$auth', '$routeParams', '$location', 'Message'];

  function editProfileController($rootScope, AuthFactory, $auth, $routeParams, $location, Message) {
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
        Message.openWelcome(name);
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
              Message.open(message);
            })
            .finally(function() {
              vm.busy = false;
            });
        } else {
          if (vm.user.deleteImage) {
            vm.user.image= null;
          }
          AuthFactory.updateUser(vm.user)
            .then(function() {
              $location.path('/profile');
            })
            .catch(function(err) {
              var message;
              if (err.data.errors.full_messages) {
                // err.data.errors.full_messages[0];
                message = "Email address is already in use. Please try again.";
              } else {
                // err.statusText;
                message = 'An error occured while trying update your information. Please try again.';
              }
              Message.open(message);
            })
            .finally(function() {
              vm.busy = false;
            });
        }
      }
    };

    vm.changePassword = function() {
      AuthFactory.openChangePasswordModal();
    };

    copyUser();
  }

})();