(function() {
  angular.module('memPeeps.users')
    .controller('profileController', profileController);

  profileController.$inject = ['$rootScope', '$auth', '$location'];

function profileController($rootScope, $auth, $location) {
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
      $auth.destroyAccount()
        .then(function(res) {
          console.log(res);
          $location.path('/');
        })
        .catch(function(err) {
          console.log(err);
          $location.path('/');
        });
    };

  }

})();