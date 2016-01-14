(function() {
  angular.module('knowYourCircle.users')
    .controller('editProfileController', editProfileController);

  editProfileController.$inject=['$rootScope', 'AuthFactory', '$auth', '$routeParams', '$location', 'Message'];

  function editProfileController($rootScope, AuthFactory, $auth, $routeParams, $location, Message) {
    var vm = this;
    vm.user = {};

    function copyUserProps() {
      for (var prop in $rootScope.user) {
        vm.user[prop] = $rootScope.user[prop];
      }
    }

    function dobFilter(person) {
      if ($rootScope.user.dob) {
        vm.user.dob = new Date($rootScope.user.dob);
      }
    }

    function firstVisitMessage() {
      if ($routeParams.first === "true") {
        var name = vm.user.first_name + " " + vm.user.last_name;
        Message.openWelcome(name);
      }
    }

    function createFilteredUser() {
      copyUserProps();
      dobFilter();
      firstVisitMessage();
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

    function updateWithImageError() {
      var message = 'An error occured while trying to update your information. Please try again.';
      Message.open(message);
    }

    function updateWithoutImageError(err) {
      var message;
      if (err.data.errors.full_messages) {
        message = "Email address is already in use. Please try again.";
      } else {
        message = 'An error occured while trying update your information. Please try again.';
      }
      Message.open(message);
    }

    function updateWithImage() {
      var submitUser = removeNullValues();
      AuthFactory.updateUserWithImage(submitUser)
        .then(function() {
          $location.path('/profile');
        })
        .catch(function() {
          updateErrorMessage();
        })
        .finally(function() {
          vm.busy = false;
        });
    }

    function updateWithoutImage() {
      if (vm.user.deleteImage) {
        vm.user.image= null;
      }
      AuthFactory.updateUser(vm.user)
        .then(function() {
          $location.path('/profile');
        })
        .catch(function(err) {
          updateWithoutImageError(err);
        })
        .finally(function() {
          vm.busy = false;
        });
    }

    function updateUser() {
      vm.busy = true;
        if (vm.user.image) {
          updateWithImage();
        } else {
          updateWithoutImage();
        }
    }

    vm.submitUpdateUserAccount = function(isValid) {
      if (isValid) {
        updateUser();
      }
    };

    vm.changePassword = function() {
      AuthFactory.openChangePasswordModal();
    };

    createFilteredUser();
  }

})();