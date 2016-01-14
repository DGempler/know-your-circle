(function() {
  angular.module('knowYourCircle.users')
    .controller('profileController', profileController);

  profileController.$inject = ['$rootScope', 'AuthFactory', '$location', 'Message'];

function profileController($rootScope, AuthFactory, $location, Message) {
    var vm = this;
    vm.user = {};

    function copyUserProps() {
      for (var prop in $rootScope.user) {
        vm.user[prop] = $rootScope.user[prop];
      }
    }

    function dobFilter(person) {
      if ($rootScope.user.dob === 'null' || $rootScope.user.dob === null) {
        vm.user.dob = "";
      } else {
        vm.user.dob = moment($rootScope.user.dob).format("MMM Do YYYY");
      }
    }

    function createFilteredUser() {
      copyUserProps();
      dobFilter();
    }

    function openMessage(message) {
      Message.open(message);
    }

    function deleteUserSuccess() {
      $location.path('/');
      openMessage('Your account has been successfully deleted.');
    }

    function deleteUser() {
      vm.busy = true;
      AuthFactory.deleteUser()
        .then(function() {
          deleteUserSuccess();
        })
        .catch(function() {
          openMessage('An error occured while trying to delete your account. Please try again.');
        })
        .finally(function() {
          vm.busy = false;
        });
    }

    vm.deleteUser = function() {
      var message = "Are you sure you want to delete your account and your whole circle?";
      Message.openConfirm(message)
        .then(function() {
          deleteUser();
        });
    };

    vm.changePassword = function() {
      AuthFactory.openChangePasswordModal();
    };

    createFilteredUser();

  }

})();